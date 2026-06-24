'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageBanner from '../../components/PageBanner/PageBanner';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      console.log('Register attempt:', formData);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <>
      <PageBanner
        title="Join"
        subtitle="WRIST AFFAIR"
        description="Create your account and discover the world of luxury timepieces."
        tag="Register"
      />

      {/* Register Content */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-0">
          
          <div className="bg-white p-8 sm:p-10 md:p-12 border border-gray-200 shadow-premium">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-12 h-0.5 bg-black mx-auto mb-5" />
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-black tracking-[2px]">Create Account</h3>
              <p className="text-sm text-gray-400 font-sans font-light mt-2.5 tracking-[1px]">
                Join the WRIST AFFAIR community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] tracking-[4px] uppercase text-gray-500 mb-2.5 font-medium font-sans">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-0 py-3.5 bg-white border-b border-gray-300 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] tracking-[4px] uppercase text-gray-500 mb-2.5 font-medium font-sans">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-3.5 bg-white border-b border-gray-300 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] tracking-[4px] uppercase text-gray-500 mb-2.5 font-medium font-sans">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-0 py-3.5 bg-white border-b border-gray-300 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] tracking-[4px] uppercase text-gray-500 mb-2.5 font-medium font-sans">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-0 py-3.5 bg-white border-b border-gray-300 focus:border-black text-black text-sm placeholder:text-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm font-sans font-light">
                  {error}
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 focus:border-black transition-colors mt-0.5"
                />
                <span className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                  I agree to the{' '}
                  <Link
                    href="/web/terms"
                    className="text-black hover:text-gray-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="/web/privacy"
                    className="text-black hover:text-gray-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-black hover:bg-gray-400 text-white text-[10px] tracking-[5px] uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-1">
                <p className="text-xs text-gray-400 font-sans font-light">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-black hover:text-gray-400 transition-colors font-medium border-b border-black/20 hover:border-gray-400 pb-0.5"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>

            {/* Divider */}
            {/* <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-[9px] text-gray-400 font-sans font-light tracking-[3px] uppercase">or continue with</span>
              </div>
            </div> */}

            {/* Social Login - Only Google */}
            {/* <div>
              <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-300 hover:border-black transition-all duration-300 group">
                <svg className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.478,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                <span className="text-[10px] tracking-[3px] uppercase text-gray-500 group-hover:text-black transition-colors font-sans font-medium">Continue with Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;