"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const NAV_SECTION_IDS = ['top', 'about', 'features'] as const;

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');
  const visibleRatios = useRef<Record<string, number>>({});

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Scroll-spy: track how much of each section is currently on screen and
  // keep the underline on whichever one is most visible. This naturally
  // moves the underline off a section the moment it scrolls out of view,
  // instead of relying on click state.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        let mostVisibleId = '';
        let highestRatio = 0;
        NAV_SECTION_IDS.forEach((id) => {
          const ratio = visibleRatios.current[id] || 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        // Account for the sticky header so a section only "counts" once
        // it's actually visible below it.
        rootMargin: '-64px 0px 0px 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans antialiased flex flex-col justify-between scroll-smooth">
      
      {/* 1. NAVBAR */}
      <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <div className="relative">
              <a
                href="#top"
                onClick={scrollToSection('top')}
                className="text-xl font-bold tracking-tight text-black"
              >
                Acuhire
              </a>
              <div
                className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-600 rounded-full transition-opacity duration-300 ${
                  activeSection === 'top' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            
            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="relative py-5">
                <a
                  href="#about"
                  onClick={scrollToSection('about')}
                  className={`transition-colors ${
                    activeSection === 'about' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
                  }`}
                >
                  About
                </a>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full transition-opacity duration-300 ${
                    activeSection === 'about' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              <div className="relative py-5">
                <a
                  href="#features"
                  onClick={scrollToSection('features')}
                  className={`transition-colors ${
                    activeSection === 'features' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
                  }`}
                >
                  Features
                </a>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full transition-opacity duration-300 ${
                    activeSection === 'features' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </nav>
          </div>

          {/* Auth Actions (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-black transition-colors">
              Log In
            </Link>
            <Link 
              href="/register" 
              className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-900 transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Hamburger Button (mobile) */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-slate-700 hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100 ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-slate-600 bg-white">
            <a href="#top" onClick={scrollToSection('top')} className={`font-bold transition-colors ${activeSection === 'top' ? 'text-indigo-600' : 'text-black'}`}>
              Acuhire
            </a>
            <a href="#about" onClick={scrollToSection('about')} className={`transition-colors ${activeSection === 'about' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}>
              About
            </a>
            <a href="#features" onClick={scrollToSection('features')} className={`transition-colors ${activeSection === 'features' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'}`}>
              Features
            </a>
            <div className="h-px bg-slate-100 my-1" />
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-black transition-colors">
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-900 transition-all shadow-sm text-center"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="top" className="relative w-full bg-gradient-to-b from-white to-[#F8F9FA] pt-12 pb-20 overflow-hidden scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            {/* Accent Badge */}
            <div className="bg-indigo-50 border border-indigo-100/60 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-indigo-700 uppercase flex items-center gap-1.5">
              <span>✦</span> The Future of Talent Acquisition
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-black leading-[1.1]">
              AI-Powered <br />
              Recruitment <br />
              Platform
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-[440px]">
              Streamline your entire hiring pipeline with human-centric AI. From CV matching to autonomous technical screening, find the perfect talent in half the time.
            </p>
            
            {/* CTAs */}
            <div className="flex items-center gap-4 pt-2 w-full sm:w-auto">
              <Link 
                href="/login" 
                className="bg-black text-white hover:bg-slate-900 font-semibold text-sm py-3 px-6 rounded flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap"
              >
                Login <span className="text-xs">➔</span>
              </Link>
              <Link 
                href="/register" 
                className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50/40 font-semibold text-sm py-3 px-6 rounded flex items-center justify-center shadow-sm transition-all whitespace-nowrap"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Hero Right: Styled Mock Dashboard Interface Graphic */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end">
            {/* Main Interactive Screen Showcase Box Container */}
            <div className="relative w-full max-w-[560px] bg-slate-950 rounded-xl shadow-2xl p-4 border border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out select-none overflow-hidden aspect-[16/10]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-cyan-950/20 mix-blend-screen" />
              
              {/* Internal Mock Dashboard Elements */}
              <div className="w-full h-full flex flex-col gap-3 text-white/80 p-2">
                {/* Mock Nav */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="w-16 h-2 bg-slate-800 rounded-full" />
                  <div className="flex gap-2">
                    <div className="w-8 h-2 bg-slate-800 rounded-full" />
                    <div className="w-8 h-2 bg-slate-800 rounded-full" />
                  </div>
                </div>
                {/* Mock Content Workspace Layout Grid */}
                <div className="grid grid-cols-12 gap-3 flex-1">
                  {/* Chart Box */}
                  <div className="col-span-8 bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
                    <div className="w-24 h-2 bg-slate-800 rounded-full mb-2" />
                    {/* Simulated Wave Chart SVG */}
                    <svg viewBox="0 0 100 30" className="w-full text-cyan-500 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0,25 Q15,5 30,18 T60,8 T90,20 T100,5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
                      <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
                      <div className="w-6 h-1.5 bg-cyan-950 rounded-full" />
                    </div>
                  </div>
                  {/* Candidate Match View Box */}
                  <div className="col-span-4 bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">👤</div>
                    <div className="w-14 h-2 bg-slate-700 rounded-full" />
                    <div className="w-10 h-1.5 bg-slate-800 rounded-full" />
                    <div className="w-full bg-indigo-950 border border-indigo-900/50 rounded p-1 text-[8px] text-center text-indigo-400 font-semibold mt-1">
                      AI Match Active
                    </div>
                  </div>
                  {/* Lower Analytic Bars Box */}
                  <div className="col-span-12 bg-slate-900/40 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <div className="w-20 h-2 bg-slate-800 rounded-full" />
                    </div>
                    <div className="flex gap-1 h-4 items-end">
                      <div className="w-1.5 h-2 bg-indigo-500 rounded-sm" />
                      <div className="w-1.5 h-3 bg-indigo-500 rounded-sm" />
                      <div className="w-1.5 h-4 bg-indigo-400 rounded-sm" />
                      <div className="w-1.5 h-1 bg-indigo-600 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating "AI Match" Detail Indicator Widget */}
            <div className="absolute -bottom-4 left-6 sm:left-12 bg-white/95 border border-slate-100 rounded-xl p-4 shadow-xl max-w-[220px] backdrop-blur-md z-20 flex flex-col gap-2 transform -rotate-1">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 text-xs">
                  🤖
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Match</h4>
                  <p className="text-xs font-bold text-slate-900">Senior Developer</p>
                </div>
              </div>
              {/* Progress Line */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                <div className="bg-indigo-600 h-full w-[94%] rounded-full" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                <span className="text-indigo-600 font-bold">94%</span> Technical Alignment
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE CONTENT: PRECISION ENGINEERING FOR HR */}
      <section id="about" className="w-full bg-white border-t border-b border-slate-100 py-16 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            Precision Engineering for HR
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            This project is an AI-powered HR and Recruitment system designed to simplify and enhance the hiring process. It helps organizations efficiently manage candidates, match CVs with job requirements using intelligent algorithms, and conduct initial interviews through an automated AI bot. The system also supports smart scheduling and provides a comprehensive dashboard for tracking and decision-making, making recruitment faster, smarter, and more effective.
          </p>
        </div>

        {/* 4. FEATURES CARDS GRID */}
        <div id="features" className="max-w-7xl mx-auto px-6 md:px-12 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-20">
          
          {/* Card 1: AI CV Matching */}
          <div className="bg-[#F8F9FA] border border-slate-200/40 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black">AI CV Matching</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatically rank candidates based on skill depth, potential, and cultural alignment using our proprietary neural ranking engine.
              </p>
            </div>
            <Link href="#" className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase mt-6 hover:underline flex items-center gap-1">
              Learn More <span className="text-[8px]">➔</span>
            </Link>
          </div>

          {/* Card 2: AI Interview Bot */}
          <div className="bg-[#F8F9FA] border border-slate-200/40 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black">AI Interview Bot</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Screen candidates 24/7 with autonomous, bias-aware voice and text bots that conduct high-quality initial technical assessments.
              </p>
            </div>
            <Link href="#" className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase mt-6 hover:underline flex items-center gap-1">
              Explore Bot <span className="text-[8px]">➔</span>
            </Link>
          </div>

          {/* Card 3: Smart Hiring Insights */}
          <div className="bg-[#F8F9FA] border border-slate-200/40 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black">Smart Hiring Insights</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Visualize your pipeline health and forecast hiring velocity with data-driven dashboards designed for executive decision-making.
              </p>
            </div>
            <Link href="#" className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase mt-6 hover:underline flex items-center gap-1">
              View Reports <span className="text-[8px]">➔</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full bg-[#F8F9FA] py-6 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="text-center sm:text-left">
            © 2024 RecruitAI Technologies. Empowering human-centric talent acquisition.
          </p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-black transition-colors">Security</Link>
            <Link href="#" className="hover:text-black transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}



// * // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */