import express from 'express';
import { createServer } from 'node:http';

import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectToSocket } from './controllers/socketManager.js';
import { userRouter } from './routes/users_routes.js';

const app = express();
const server = createServer(app);// Create a new HTTP server
const io = connectToSocket(server)// Create a new instance of Socket.IO

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"})); // Set a limit for the JSON body size
app.use(express.urlencoded({limit: "40kb", extended: true }));

app.use("/api/v1/users", userRouter); // Use the user router for user-related routes


const start = async() => {
    // Connect to MongoDB
    const connectionDb = await mongoose.connect("mongodb+srv://harshsaini132159:2004%40Harshsaini@cluster0.wixojqi.mongodb.net/mydb?retryWrites=true&w=majority")
    
    console.log(`Connected to MongoDB Host ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
    })
}

start();

