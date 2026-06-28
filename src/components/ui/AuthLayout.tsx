"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Triggers the entry animation instantly on mount to look identical on both routes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-[#1A1D20] font-sans antialiased">
      
      {/* TOP BAR */}
      <header className="w-full bg-white border-b border-slate-100 shrink-0">
        <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
            ACUhire
          </Link>
          <div className="bg-indigo-50 border border-indigo-100/60 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-indigo-700 uppercase flex items-center gap-1.5">
            <span>✦</span> Powered by AI
          </div>
        </div>
      </header>

      {/* BODY: Split Layout */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT PANEL: Form with subtle, professional entrance animation & hover shadow transitions */}
        <div className="relative flex items-center justify-center px-6 sm:px-10 md:px-16 py-12 lg:py-16">
          {/* Back Arrow */}
          <Link
            href="/"
            aria-label="Back to home"
            className="absolute top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-black hover:border-slate-300 transition-colors bg-white z-10 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* 
            UNIFIED ANIMATION CONTAINER: 
            Applies the exact same professional fade-in, upward drift, subtle scale-up, 
            and smooth hover shadow expansion to both Login and Sign Up variants.
          */}
          <div 
            className={`w-full max-w-[420px] pt-8 p-6 sm:p-8 rounded-2xl bg-white transition-all duration-500 ease-out transform hover:shadow-md ${
              isMounted 
                ? 'opacity-100 translate-y-0 scale-100 shadow-sm' 
                : 'opacity-0 translate-y-2 scale-[0.98] shadow-none'
            }`}
          >
            {children}
          </div>
        </div>

        {/* RIGHT PANEL: Visual Branding Section */}
        <div className="relative hidden lg:flex flex-col justify-end overflow-hidden bg-slate-950 px-12 py-12">
          {/* Ambient Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-10 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-0 w-[360px] h-[360px] bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen text-cyan-500" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0,420 Q100,300 200,400 T400,380 T600,440 T800,360" />
              <path d="M0,500 Q120,380 240,480 T460,440 T680,500 T800,440" opacity="0.6" />
              <path d="M0,300 Q140,220 260,300 T480,260 T700,320 T800,260" opacity="0.4" />
            </svg>
          </div>

          {/* Floating Analytics Widget */}
          <div 
            className={`absolute top-10 right-10 z-10 bg-slate-900/90 border border-slate-700/60 rounded-xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-2 w-[160px] transition-all duration-700 delay-150 ease-out transform ${
              isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs">
                📈
              </div>
              <div className="leading-tight">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Live Analytics</p>
                <p className="text-[10px] font-bold text-white">Match Accuracy</p>
              </div>
            </div>
            <div className="flex gap-1 h-8 items-end mt-1">
              <div className="w-2.5 h-3 bg-indigo-500 rounded-sm" />
              <div className="w-2.5 h-5 bg-indigo-500 rounded-sm" />
              <div className="w-2.5 h-4 bg-indigo-400 rounded-sm" />
              <div className="w-2.5 h-7 bg-indigo-400 rounded-sm" />
              <div className="w-2.5 h-6 bg-indigo-500 rounded-sm" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-extrabold text-white">98.4%</span>
              <span className="text-[10px] font-semibold text-teal-400">+2.1% ↗</span>
            </div>
          </div>

          {/* Main Hero Copy */}
          <div className="relative z-10 max-w-md">
            <div className="w-10 h-0.5 bg-indigo-500 rounded-full mb-5" />
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Intelligence Redefined <br /> for Strategic Hiring.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mt-4 max-w-[360px]">
              Cognitive Talent uses advanced machine learning to map candidate potential to organizational DNA, ensuring precision in every placement.
            </p>

            {/* Social Trust Row */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-950" />
                <div className="w-7 h-7 rounded-full bg-slate-600 border-2 border-slate-950" />
                <div className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-slate-950 flex items-center justify-center text-[9px] text-white font-bold">
                  +2K
                </div>
              </div>
              <span className="text-xs text-slate-400">Trusted by HR leaders worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="hidden lg:block w-full bg-[#F8F9FA] py-4 border-t border-slate-200/60 shrink-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-5 font-medium">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-black transition-colors">Security</Link>
            <Link href="#" className="hover:text-black transition-colors">Cookie Settings</Link>
          </div>
          <p>© 2024 Cognitive Talent AI. Precision Engineering for Talent Acquisition.</p>
        </div>
      </footer>
    </div>
  );
}








/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */