'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/shared/SearchBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { SortDropdown } from './SortDropdown';
import { JobFeed } from './JobFeed';
import { Briefcase, Calendar, Video, User, Bell, HelpCircle, Menu } from 'lucide-react';

export default function JobsFeedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans antialiased">
      
      {/* GLOBAL NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded md:hidden"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-lg tracking-tight text-black">ACUHire</span>
        </div>

        <SearchBar />

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
              alt="Avatar"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </nav>

      {/* BODY CONTEXT LAYOUT */}
      <div className="flex pt-14 min-h-screen">
        
        {/* CANDIDATE SIDEBAR */}
        <aside className={`
          fixed inset-y-14 left-0 w-60 bg-[#F8FAFC] border-r border-gray-100 pt-6 px-4 transform transition-transform duration-200 ease-in-out z-40
          md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="mb-6 px-2">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">RecruitAI</h2>
            <p className="text-[11px] text-gray-400">Candidate Portal</p>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md bg-[#EDEFFE] text-[#4F46E5]">
              <Briefcase size={16} />
              <span>Jobs</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <Calendar size={16} />
              <span>Interviews</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <Video size={16} />
              <span>Recording</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              <User size={16} />
              <span>Profile</span>
            </a>
          </nav>
        </aside>

        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/20 z-30 md:hidden" />
        )}

        {/* FEED SECTION CONTENT */}
        <main className="flex-1 md:pl-60 p-6 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto mt-2">
            
            <PageHeader 
              title="Recommended Roles" 
              description="Curated based on your skills, experience, and career goals."
            >
              <SortDropdown />
            </PageHeader>

            <JobFeed />

          </div>
        </main>

      </div>
    </div>
  );
}