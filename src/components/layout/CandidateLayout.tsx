"use client";

import React, { useState } from 'react';
import { SearchBar } from '@/components/shared/SearchBar';
import { CandidateSidebar } from './CandidateSidebar';
import { Bell, HelpCircle, Menu, X } from 'lucide-react';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

export const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans antialiased">
      
      {/* 1. PERSISTENT FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger menu toggle button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded md:hidden"
            aria-label="Toggle Navigation Drawer"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-bold text-lg tracking-tight text-black">ACUHire</span>
        </div>

        {/* Reusable Search Component container */}
        <SearchBar />

        {/* Top bar right utilities panel icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-black transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-black rounded-full"></span>
          </button>
          <button className="text-gray-500 hover:text-black transition-colors">
            <HelpCircle size={18} />
          </button>
          <div className="h-7 w-7 rounded-full bg-slate-300 overflow-hidden border border-gray-200 cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
              alt="User Avatar"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </nav>

      {/* 2. MAIN APPLICATION CORE WORKSPACE VIEW */}
      <div className="flex pt-14 min-h-screen">
        
        {/* DESKTOP SIDEBAR DRAWER VIEWPORTS */}
        <aside className="fixed inset-y-14 left-0 w-60 bg-[#F8FAFC] border-r border-gray-100 hidden md:block z-40">
          <CandidateSidebar />
        </aside>

        {/* MOBILE SIDEBAR MODAL SHEET SLIDER DRAWER */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Transparent click backdrop interceptor sheet container */}
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="absolute inset-0 bg-black/30 backdrop-blur-xs" 
          />
          <aside className={`absolute top-0 bottom-0 left-0 w-60 bg-[#F8FAFC] shadow-xl border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <CandidateSidebar onCloseMobile={() => setSidebarOpen(false)} />
          </aside>
        </div>

        {/* INHERITED DYNAMIC INNER PAGE RENDER SLOT VIEWPORTS */}
        <main className="flex-1 md:pl-60 p-4 sm:p-6 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto mt-2">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};