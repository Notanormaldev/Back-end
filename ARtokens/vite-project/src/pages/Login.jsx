import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/authhook.js'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  let { register, handleSubmit, errors, apiError, onLogin, isSubmitting } = useAuth()

  return (
    <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
        <p className="text-slate-400 text-sm mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onLogin)} className="space-y-5" noValidate>
        {apiError && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs font-medium text-center">
            ⚠️ {apiError}
          </div>
        )}
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border text-sm transition-all outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500'
                : 'border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border text-sm transition-all outline-none focus:ring-2 pr-14 ${
                errors.password
                  ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors text-xs font-medium px-1.5 py-0.5 rounded bg-slate-800"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            {...register('remember')}
          />
          <label htmlFor="remember" className="ml-2 text-xs text-slate-300 select-none cursor-pointer">
            Remember me on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-semibold text-white text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Login