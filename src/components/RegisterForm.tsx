'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth';
import { Spinner } from './ui/Icons';

export default function RegisterForm() {
  const { register, isLoading, error: authError } = useAuth();
  
  const [role, setRole] = useState<UserRole>('candidate');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState<{
    username?: string;
    gender?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username) newErrors.username = 'User name tracking criteria required';
    if (!gender) newErrors.gender = 'Please establish systemic gender parameter';
    
    if (!email) {
      newErrors.email = 'Contact email parameter required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Provide valid systemic configuration formatting';
    }

    if (!password) {
      newErrors.password = 'Security operational code password mandatory';
    } else if (password.length < 8) {
      newErrors.password = 'Must meet or exceed safe 8 character thresholds';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await register(email, username, gender, role);
  };

  return (
    <div className="w-full">
      {/* Heading Block */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black tracking-tight">Create Account</h1>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Join the next generation of high-precision recruitment.
        </p>
      </div>

      {/* Role Selection System */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setRole('candidate')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
            role === 'candidate'
              ? 'bg-white border-slate-300 text-black shadow-sm'
              : 'bg-slate-50/50 border-slate-200/60 text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign Up as Candidate
        </button>
        <button
          type="button"
          onClick={() => setRole('company')}
          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
            role === 'company'
              ? 'bg-white border-slate-300 text-black shadow-sm'
              : 'bg-slate-50/50 border-slate-200/60 text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign Up as Company
        </button>
      </div>

      {/* Core Dynamic Field Block Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {authError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100">
            {authError}
          </div>
        )}

        {/* Username Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            User Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. johndoe"
            disabled={isLoading}
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
            }`}
          />
          {errors.username && <p className="text-[10px] text-red-500 mt-1">{errors.username}</p>}
        </div>

        {/* Gender Select Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Gender
          </label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={isLoading}
              className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg appearance-none focus:outline-none focus:ring-1 cursor-pointer ${
                gender ? 'text-slate-900' : 'text-slate-400'
              } ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'}`}
            >
              <option value="" disabled hidden>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Decline to state</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
          </div>
          {errors.gender && <p className="text-[10px] text-red-500 mt-1">{errors.gender}</p>}
        </div>

        {/* Contact Email Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hr@company.com"
            disabled={isLoading}
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
            }`}
          />
          {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            className={`w-full px-3 py-2 bg-white text-slate-900 border text-xs rounded-lg focus:outline-none focus:ring-1 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-slate-400 focus:ring-slate-400'
            }`}
          />
          {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Action Registration Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-slate-900 font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 tracking-wide disabled:bg-slate-400 transition-all cursor-pointer mt-2"
        >
          {isLoading ? <Spinner className="w-4 h-4 text-white" /> : 'Get Started Now'}
        </button>
      </form>
    </div>
  );
}







/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */