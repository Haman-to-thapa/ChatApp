import React, { useState } from "react"
import type { LoginProps } from "../interface"





const Login = ({ onLogin }: LoginProps) => {

  const [username, setUsername] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username.trim()) {
      onLogin(username)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-black/5 overflow-hidden">
        {/* left die gradient section */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-violet-500">

        </div>

        <div className="px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome to teamSpace</h1>
            <p className="mt-2 text-slate-600">Join the conservation</p>
          </div>
          {/* Login form */}
          <form onSubmit={handleSubmit} action="" className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Choose a username</label>
              <div className="">
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none
                  focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400
                  "  required />
                {
                  username && <div className="absolute right-10 top-1/3 -translate-1/2">
                    <div className="h-2 w-2 rounded-full">

                    </div>
                  </div>
                }
              </div>
            </div>
            <button
              disabled={!username.trim()}
              type="submit" className="w-full px-4 py-3 mt-5 text-white font-medium bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:shadow-none disabled:opacity-50 hover:transition-colors disabled:cursor-not-allowed">Join Chat</button>
          </form>
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-center mx-1">By joining, you agree to our
              <a href="#" className="text-blue-500 hover:text-blue-800 ml-1" >Terms</a>
              {" "} and
              <a href="#" className="text-blue-500 ml-1 hover:text-blue-800">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login