
import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br ">
      {/* Header */}
      <header className="w-full px-6 py-4 lg:px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold  text-green-500 bg-clip-text line-through">
              Konnect
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => {router('/ajkl123')}} className="cursor-pointer inline-flex items-center justify-center rounded-full px-6 py-2 transition-colors ">
              Join as Guest
            </button>
            <button onClick={() => {router('/auth')}} className=" cursor-pointer inline-flex items-center justify-center rounded-full px-6 py-2 border-2 border-blue-200 bg-transparent transition-colors hover:bg-blue-50 ">
              Login
            </button>
            <button onClick={() => {router('/auth')}} className=" cursor-pointer inline-flex items-center justify-center rounded-full px-6 py-2 bg-[#5D38DE] text-white transition-all hover:from-blue-700 hover:to-purple-700 curser-pointer ">
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className='line-through text-green-500 font-medium'>Konnect {" "}</span>
                 with your{" "}
                <span className="bg-gradient-to-r bg-black bg-clip-text text-transparent">
                  loved ones
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience seamless and secure video conferencing that brings people together, 
                no matter where they are. Crystal clear calls, instant connections.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { router('/auth')}} className="cursor-pointer inline-flex items-center justify-center text-lg px-16 py-3 rounded-full bg-gradient-to-r bg-[#5D38DE] text-white shadow-lg transition-all  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Let's konnect
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">HD Video Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">End-to-End Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Cross-Platform</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative ">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 to-orange-50 py-4 px-1">
              <img src='/mobile.png' className='mx-auto'/>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </main>

    </div>
    )
}
