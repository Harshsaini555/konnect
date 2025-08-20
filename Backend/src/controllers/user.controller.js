import httpStatus from "http-status";
import { User } from "../models/user_model.js";
import bcrypt, { hash } from "bcrypt"
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

const login = async(req, res) =>{
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        
        if(isPassword){
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ message: "Login successful", token: token });
        }
    }catch(e){
        return res.status(500).json({message: `Something went wrong ${e}` });
    }
}
const register = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" })

    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }

}

const getUserHistory = async (req,res) => {
    const {token} = req.query;
    if(!token){
        return res.status(httpStatus.BAD_REQUEST).json({message: "Token is required"});
    }
    try{
        const user = await User.findOne({token: token});

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const meetings = await Meeting.find({user_id: user.username});
        res.status(httpStatus.OK).json({meetings});
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Something went wrong ${e}`});
    }
}

const addToHistory = async (req,res) => {
    const {token, meeting_code} = req.body;
    if(!token || !meeting_code){
        return res.status(httpStatus.BAD_REQUEST).json({message: "Token and meeting code are required"});
    }

    try{
        const user = await User.findOne({token: token});

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code,
        })

        await newMeeting.save();
        res.status(httpStatus.CREATED).json({message: "Meeting added to history"});
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Something went wrong ${e}`});

    }
}

export { login, register, getUserHistory, addToHistory };