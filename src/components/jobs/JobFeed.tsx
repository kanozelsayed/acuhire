"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { mockJobs } from '@/data/jobs';
import { JobCard } from './JobCard';
import { LoadMoreButton } from './LoadMoreButton';
import { Inbox } from 'lucide-react';

export const JobFeed = () => {
  const searchParams = useSearchParams();
  
  // جلب كلمة البحث من الـ URL
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // فلترة الوظائف بناءً على العنوان، الشركة، أو الـ Tags (المهارات)
  const filteredJobs = mockJobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchQuery);
    const matchesCompany = job.company.toLowerCase().includes(searchQuery);
    const matchesTags = job.tags.some(tag => tag.text.toLowerCase().includes(searchQuery));
    
    return matchesTitle || matchesCompany || matchesTags;
  });

  // شاشة الـ Not Found لو مفيش وظائف مطابقة للبحث
  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-100 rounded-xl shadow-sm space-y-3 animate-fadeIn">
        <div className="inline-flex p-3 bg-gray-50 border border-gray-100 rounded-full text-gray-400">
          <Inbox size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900">No Roles Found</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            We couldn&apos;t find any active positions matching &quot;{searchQuery}&quot;. Try adjusting your keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      
      {filteredJobs.length > 2 && <LoadMoreButton />}
    </div>
  );
};