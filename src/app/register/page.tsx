"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/ui/AuthLayout';

type RegisterRole = 'candidate' | 'company';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<RegisterRole>('candidate');

  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [taxId, setTaxId] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'company' || roleParam === 'candidate') {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleRoleChange = (newRole: RegisterRole) => {
    setRole(newRole);
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (role === 'candidate') {
      if (!username) newErrors.username = 'Username is required';
      if (!gender) newErrors.gender = 'Please select your gender';
    } else {
      if (!companyName) newErrors.companyName = 'Company name is required';
      if (!industry) {
        newErrors.industry = 'Please select an industry';
      } else if (industry === 'other' && !customIndustry.trim()) {
        newErrors.customIndustry = 'Please specify your industry field';
      }
      if (!taxId) newErrors.taxId = 'Tax ID is required';
      if (!companySize) newErrors.companySize = 'Please select company size';
    }

    if (!email) {
      newErrors.email = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const industryPayload = industry === 'other' ? customIndustry : industry;
    console.log({ role, email, password, industryPayload });
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">
          {role === 'candidate' ? 'Create Account' : 'Create Company Account'}
        </h1>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Join the next generation of high-precision recruitment.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 gap-3 my-6">
        <button
          type="button"
          onClick={() => handleRoleChange('candidate')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
            role === 'candidate'
              ? 'bg-white border-slate-300 text-black shadow-sm font-bold'
              : 'bg-slate-50/50 border-slate-200/60 text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign Up as Candidate
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('company')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
            role === 'company'
              ? 'bg-white border-slate-300 text-black shadow-sm font-bold'
              : 'bg-slate-50/50 border-slate-200/60 text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign Up as Company
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {role === 'candidate' ? (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. johndoe"
                className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
                  errors.username ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
              {errors.username && <p className="text-[10px] text-red-500 mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg appearance-none focus:outline-none focus:ring-1 cursor-pointer ${
                    gender ? 'text-slate-900' : 'text-slate-400'
                  } ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'}`}
                >
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
              </div>
              {errors.gender && <p className="text-[10px] text-red-500 mt-1">{errors.gender}</p>}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Modern Tech Solutions"
                className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
                  errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
              {errors.companyName && <p className="text-[10px] text-red-500 mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Industry
              </label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg appearance-none focus:outline-none focus:ring-1 cursor-pointer ${
                    industry ? 'text-slate-900' : 'text-slate-400'
                  } ${errors.industry ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'}`}
                >
                  <option value="" disabled hidden>Select Industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other (Specify field)</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
              </div>
              {errors.industry && <p className="text-[10px] text-red-500 mt-1">{errors.industry}</p>}
            </div>

            {industry === 'other' && (
              <div className="animate-fadeIn">
                <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
                  Specify Your Industry Sector
                </label>
                <input
                  type="text"
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  placeholder="Write industry here..."
                  className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.customIndustry ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.customIndustry && <p className="text-[10px] text-red-500 mt-1">{errors.customIndustry}</p>}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Tax ID
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="e.g. 123-456-789"
                className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
                  errors.taxId ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
                }`}
              />
              {errors.taxId && <p className="text-[10px] text-red-500 mt-1">{errors.taxId}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Company Size
              </label>
              <div className="relative">
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg appearance-none focus:outline-none focus:ring-1 cursor-pointer ${
                    companySize ? 'text-slate-900' : 'text-slate-400'
                  } ${errors.companySize ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'}`}
                >
                  <option value="" disabled hidden>Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
              </div>
              {errors.companySize && <p className="text-[10px] text-red-500 mt-1">{errors.companySize}</p>}
            </div>
          </>
        )}

        {/* SHARED FIELDS */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hr@company.com"
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
            }`}
          />
          {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
            }`}
          />
          {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400'
            }`}
          />
          {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white hover:bg-slate-900 font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 tracking-wide transition-all cursor-pointer mt-4 shadow-sm"
        >
          Get Started Now
        </button>
      </form>
    </AuthLayout>
  );
} 

// اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي 