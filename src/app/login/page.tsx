"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/ui/AuthLayout';

type LoginTab = 'candidate' | 'company';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<LoginTab>('candidate');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  // Form input field configurations
  const [candidateEmail, setCandidateEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');

  // Isolated validation error tracking
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    setErrors({});
    setPassword('');
  };

  const validateForm = () => {
    const currentErrors: typeof errors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (activeTab === 'candidate') {
      if (!candidateEmail) {
        currentErrors.email = 'Candidate email address is required';
      } else if (!emailRegex.test(candidateEmail)) {
        currentErrors.email = 'Please enter a valid candidate email address';
      }
    } else {
      if (!companyEmail) {
        currentErrors.email = 'Company email address is required';
      } else if (!emailRegex.test(companyEmail)) {
        currentErrors.email = 'Please enter a valid company email address';
      }
    }

    if (!password) {
      currentErrors.password = 'Password is required to proceed';
    } else if (password.length < 6) {
      currentErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const authenticatedEmail = activeTab === 'candidate' ? candidateEmail : companyEmail;
    console.log(`Authenticating as [${activeTab}]:`, authenticatedEmail);
  };

  return (
    <AuthLayout>
      {/* Page Title Block */}
      <h1 className="text-2xl font-extrabold tracking-tight text-black">Welcome Back</h1>
      <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-[380px]">
        Access your intelligent recruitment dashboard and discover top talent powered by AI.
      </p>

      {/* Sliding Control Switcher Tabs */}
      <div className="relative grid grid-cols-2 bg-slate-100 rounded-lg p-1 mt-8 w-full max-w-[320px]">
        <div
          className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-md bg-white shadow-sm transition-transform duration-300 ease-out ${
            activeTab === 'company' ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
        <button
          type="button"
          onClick={() => handleTabChange('candidate')}
          aria-pressed={activeTab === 'candidate'}
          className={`relative z-10 px-3 py-2 text-[11px] font-bold uppercase tracking-wide rounded-md transition-colors duration-300 cursor-pointer ${
            activeTab === 'candidate' ? 'text-black' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Sign In as Candidate
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('company')}
          aria-pressed={activeTab === 'company'}
          className={`relative z-10 px-3 py-2 text-[11px] font-bold uppercase tracking-wide rounded-md transition-colors duration-300 cursor-pointer ${
            activeTab === 'company' ? 'text-black' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Sign In as Company
        </button>
      </div>

      {/* Submission Action Framework */}
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        
        {/* Isolated Input Identifier Container with Active Crossfades */}
        <div className="relative min-h-[72px]">
          {activeTab === 'candidate' ? (
            <div className="animate-fadeIn">
              <label htmlFor="candidateEmail" className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                Email Address
              </label>
              <input
                id="candidateEmail"
                type="email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="name@company.com"
                className={`w-full border rounded px-3 py-2.5 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-400'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          ) : (
            <div className="animate-fadeIn">
              <label htmlFor="companyEmail" className="block text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                Company Email
              </label>
              <input
                id="companyEmail"
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="Enter your company email"
                className={`w-full border rounded px-3 py-2.5 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-400'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          )}
        </div>

        {/* Unified Security Key Parameters Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full border rounded px-3 py-2.5 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors ${
              errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-400'
            }`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Keep Me Signed In Checkbox */}
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
          />
          Keep me signed in for 30 days
        </label>

        {/* Form Submission Action CTA */}
        <button
          type="submit"
          className="w-full bg-black text-white hover:bg-slate-900 font-semibold text-sm py-3 rounded flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          Log In <span className="text-xs">➔</span>
        </button>

        {/* Request Access Registration Link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
            Request Access
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

// اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي