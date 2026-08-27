import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  })

  const password = watch('password')

  const onSubmit = (data) => {
    console.log('Register Form Submitted:', data)
    // Example: navigate('/') or perform user registration API call
  }

  return (
    <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
        <p className="text-slate-400 text-sm mt-2">Join us today to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border text-sm transition-all outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500'
                : 'border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.fullName.message}
            </p>
          )}
        </div>

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
                message: 'Invalid email address',
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
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
            Password
          </label>
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

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 border text-sm transition-all outline-none focus:ring-2 pr-14 ${
                errors.confirmPassword
                  ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-slate-800 focus:ring-indigo-500/50 focus:border-indigo-500'
              }`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors text-xs font-medium px-1.5 py-0.5 rounded bg-slate-800"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions Checkbox */}
        <div>
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
              {...register('terms', {
                required: 'You must agree to the terms and conditions',
              })}
            />
            <label htmlFor="terms" className="ml-2 text-xs text-slate-300 select-none cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-indigo-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-400 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-semibold text-white text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-3 cursor-pointer"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default Register