'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth';
import { Spinner } from './ui/Icons';

export default function LoginForm() {
  const { login, isLoading, error: authError } = useAuth();
  
  // Tab/Role handling state
  const [activeTab, setActiveTab] = useState<UserRole>('candidate');
  
  // Form input fields
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation local state tracking
  const [errors, setErrors] = useState<{ email?: string; companyId?: string; password?: string }>({});

  const handleTabChange = (tab: UserRole) => {
    setActiveTab(tab);
    setErrors({});
    setPassword('');
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (activeTab === 'candidate') {
      if (!email) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please provide a valid email structure';
      }
    } else {
      if (!companyId) {
        newErrors.companyId = 'Company ID is required';
      }
    }
    
    if (!password) {
      newErrors.password = 'Password cannot be blank';
    } else if (password.length < 6) {
      newErrors.password = 'Password must exceed 6 configurations';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const contextIdentifier = activeTab === 'candidate' ? email : companyId;
    await login(contextIdentifier, activeTab);
  };

  return (
    <div className="w-full relative">
      
      {/* Small Back Arrow to Home Landing Page */}
      <div className="absolute -top-10 left-0">
        <Link 
          href="/" 
          className="group flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white shadow-sm text-slate-500 hover:text-black hover:border-slate-400 transition-all duration-200"
          aria-label="Back to Home"
        >
          <svg 
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>

      {/* Heading Block */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black tracking-tight">Welcome Back</h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Access your intelligent recruitment dashboard and discover top talent powered by AI.
        </p>
      </div>

      {/* Dynamic Selector Tabs with Active Highlights */}
      <div className="grid grid-cols-2 gap-3 mb-8 bg-slate-50 p-1 rounded-xl border border-slate-100">
        <button
          type="button"
          onClick={() => handleTabChange('candidate')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-300 text-center cursor-pointer ${
            activeTab === 'candidate'
              ? 'bg-white border border-slate-200 text-black shadow-sm'
              : 'border border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Candidate Login
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('company')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-300 text-center cursor-pointer ${
            activeTab === 'company'
              ? 'bg-white border border-slate-200 text-black shadow-sm'
              : 'border border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Company Login
        </button>
      </div>

      {/* Main Login Form Context Body Wrapper */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {authError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100 animate-fadeIn">
            {authError}
          </div>
        )}

        {/* Dynamic Tab Panel Container Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'candidate' ? (
            /* CANDIDATE COMPONENT (image_3363c6.jpg) */
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={isLoading}
                  className={`w-full px-3 py-2.5 bg-white text-slate-900 border text-xs rounded-lg transition-colors focus:outline-none focus:ring-1 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
          ) : (
            /* COMPANY COMPONENT (image_3360fc.jpg) */
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Company ID
                </label>
                <input
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  placeholder="Enter your Company ID"
                  disabled={isLoading}
                  className={`w-full px-3 py-2.5 bg-white text-slate-900 border text-xs rounded-lg transition-colors focus:outline-none focus:ring-1 ${
                    errors.companyId 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
                  }`}
                />
                {errors.companyId && <p className="text-[11px] text-red-500 mt-1">{errors.companyId}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Unified Password Input Field shared across variants */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <a href="#" className="text-[10px] font-semibold text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            className={`w-full px-3 py-2.5 bg-white text-slate-900 border text-xs rounded-lg transition-colors focus:outline-none focus:ring-1 ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
            }`}
          />
          {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me Toggle */}
        <div className="flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="remember_me" className="ml-2 text-xs text-slate-400 font-medium select-none cursor-pointer">
            Keep me signed in for 30 days
          </label>
        </div>

        {/* Action Submission Trigger Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-slate-900 font-semibold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 tracking-wide disabled:bg-slate-400 transition-all cursor-pointer"
        >
          {isLoading ? <Spinner className="w-4 h-4 text-white" /> : 'Log In →'}
        </button>
      </form>
    </div>
  );
}





/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */