"use client";

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockJobs } from '@/data/jobs';
import { 
  Building2, 
  Landmark, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Briefcase,
  Clock,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Convert parameter string ID directly to a number
  const id = Number(params.id);

  // Search the mock data for matching job, fallback to the first element
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];
  const isHighMatch = job.match >= 90;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Back Button Navigation Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/jobs" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} /> Back to Recommended Roles
        </Link>
      </div>

      {/* Main Corporate Title Banner Row */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 ${isHighMatch ? 'bg-[#0A8567]' : 'bg-[#4F46E5]'}`} />
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-xl shrink-0 ${isHighMatch ? 'bg-[#EEF2FF]' : 'bg-[#F1F3F9]'}`}>
              {job.categoryTag === 'FINTECH' ? (
                <Landmark size={32} className="text-[#3B4E8E]" />
              ) : (
                <Building2 size={32} className="text-[#4F46E5]" />
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">{job.title}</h1>
                <span className="text-[10px] font-bold bg-[#EFEFEF] text-gray-500 px-1.5 py-0.5 rounded tracking-wider">
                  {job.categoryTag}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-gray-500">
                <span className="text-gray-900 font-semibold">{job.company}</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                <span className="flex items-center gap-1"><DollarSign size={13} /> {job.salary}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> Full-Time</span>
                <span className="flex items-center gap-1"><Briefcase size={13} /> Remote</span>
              </div>
            </div>
          </div>

          <div className={`self-start flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border ${
            isHighMatch 
              ? 'bg-[#E6F9F4] text-[#0A8567] border-[#B9F0E1]' 
              : 'bg-[#EEF2F6] text-[#4F5E74] border-gray-200'
          }`}>
            {isHighMatch && <Sparkles size={12} />}
            <span>{job.match}% AI Match Score</span>
          </div>
        </div>

        {/* Action Button Navigation Trigger */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-400">Posted 2 days ago • 14 applicants</p>
          <button 
            onClick={() => router.push(`/jobs/${job.id}/apply`)}
            className="bg-black hover:bg-gray-800 text-white text-xs font-medium py-2.5 px-5 rounded-md flex items-center gap-2 transition-all shadow-sm"
          >
            Apply Now <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Grid Layout Splitter Info Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">About the Company</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              {job.company} is a fast-growing industry leader dedicated to developing next-generation operational infrastructure. We focus on scale, high-availability platforms, and empowering modern developer ecosystems through highly interactive, visually polished client interfaces.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Job Description</h2>
            <p className="text-xs text-gray-600 leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Key Responsibilities</h2>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                <span>Architect extensible component layers ensuring state isolation, high-performance runtime reactivity, and programmatic cleanups.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                <span>Collaborate closely with technical product leadership and UI engineers to define API contract models and state stores.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2.5">Required Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {['TypeScript', 'React.js', 'Next.js App Router', 'Tailwind CSS'].map((s, i) => (
                  <span key={i} className="text-xs bg-gray-50 text-gray-700 font-medium px-2.5 py-1 rounded-md border border-gray-100">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Match Sidebar Panel */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-[#EEF2FF] rounded-bl-xl text-[#4F46E5]">
              <Sparkles size={16} />
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Insights</h3>
            <h2 className="text-sm font-bold text-gray-900 mt-1">AI Match Analysis</h2>
            
            <div className="my-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">{job.match}%</span>
              <p className="text-[11px] text-gray-500 leading-tight font-medium">Your profile directly aligns with the technical vectors sought by this team.</p>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <button 
                onClick={() => router.push(`/jobs/${job.id}/apply`)}
                className="w-full text-center text-xs font-bold bg-black hover:bg-gray-800 text-white py-2 rounded-md transition-all shadow-sm"
              >
                Proceed to Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}