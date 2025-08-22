  import * as React from 'react';
  import { AuthContext } from '../contexts/AuthContext';
import { createTheme } from '@mui/system';



  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();

  export default function Authentication() {

      

      const [username, setUsername] = React.useState("");
      const [password, setPassword] = React.useState("");
      const [name, setName] = React.useState("");
      const [error, setError] = React.useState();
      const [message, setMessage] = React.useState();


      const [formState, setFormState] = React.useState(0);

      const [open, setOpen] = React.useState(false)


      const { handleRegister, handleLogin } = React.useContext(AuthContext);

      let handleAuth = async (e) => {
        e.preventDefault();
          try {
              if (formState === 0) {

                  let result = await handleLogin(username, password)
                  console.log("Login Success", result);

              }
              if (formState === 1) {
                  let result = await handleRegister(name, username, password);
                  console.log(result);
                  setUsername("");
                  setMessage(result);
                  setError("")
                  setFormState(0)
                  setPassword("")
              }
          } catch (err) {

              console.log(err);
              let message = (err.response.data.message);
              setError(message);
          }
      }


      return (
          <div className="min-h-screen flex">
        {/* Left Side - Background Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-purple-600/60 to-indigo-700/80"></div>
          
          {/* Content on overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white space-y-6">
              <h1 className="text-5xl font-bold">
                Welcome to{" "}
                <span className="text-blue-200">Konnect</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-md">
                Connect with your team and loved ones through seamless video conferencing
              </p>
              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200">100+</div>
                  <div className="text-blue-100">Connections at a time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200">99.9%</div>
                  <div className="text-blue-100">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="w-full max-w-md">
            

            {/* Card Container */}
            <div className="bg-white rounded-3xl  border border-gray-100 p-8">
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                <button
                  onClick={() => setFormState(0)}
                  className={`flex-1 py-2 px-4 text-center rounded-xl transition-all duration-200 ${
                    formState === 0
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setFormState(1)}
                  className={`flex-1 py-2 px-4 text-center rounded-xl transition-all duration-200 ${
                    formState === 1
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleAuth}>
                {/* Full Name - Only show for Sign Up */}
                {formState === 1 && (
                  <div className="space-y-2">
                    <label className="block text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      
                      placeholder="Enter your full name"
                      value={name}
                      className="w-full px-4 py-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                )}

                {/* Username/Email */}
                <div className="space-y-2">
                  <label className="block text-gray-700">
                    {formState === 0 ? 'Username' : 'Username'}
                  </label>
                  <input
                    type="text"
                    
                    value={username}
                    placeholder={formState === 0 ? 'Enter your email or username' : 'Choose a username'}
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                  
                    value={password}
                    placeholder="Enter your password"
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>


                {/* Remember Me / Forgot Password - Only for Sign In */}
                {formState === 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  
                >
                  {formState === 0 ? 'Sign In' : 'Create Account'}
                </button>

                {/* Terms and Privacy - Only for Sign Up */}
                {formState === 1 && (
                  <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </button>
                  </p>
                )}
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Continue with Facebook</span>
                </button>
              </div>

              {/* Guest Login */}
              <div className="text-center mt-6">
                <button onClick={() => {window.location.href = '/ajk123'}} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      );
  }