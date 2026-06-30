"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Calendar, Video, User } from 'lucide-react';

interface CandidateSidebarProps {
  onCloseMobile?: () => void;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();

  // Navigation schema for candidate workspace links
  const navigationItems = [
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'Recording', href: '/recording', icon: Video },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  // Helper calculation to check paths and keep 'Jobs' active when viewing single details or forms
  const isLinkActive = (href: string) => {
    if (href === '/jobs') {
      return pathname.startsWith('/jobs');
    }
    return pathname === href;
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col pt-6 px-4">
      <div className="mb-6 px-2">
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">RecruitAI</h2>
        <p className="text-[11px] text-gray-400">Candidate Portal</p>
      </div>

      <nav className="space-y-1 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isLinkActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                active
                  ? 'bg-[#EDEFFE] text-[#4F46E5]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};