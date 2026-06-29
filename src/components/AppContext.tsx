'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  bio: string;
  skills: string[];
  emailNotifications: boolean;
  twoFactor: boolean;
  publicProfile: boolean;
}

interface AppContextType {
  profile: ProfileData;
  updateProfile: (updatedFields: Partial<ProfileData>) => void;
  syncAuthData: (authData: { name: string; email: string }) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Alexandre Moreau',
    email: 'alexandre.m@acuhire.ai',
    phone: '+33 4 72 00 00 00',
    jobTitle: 'Senior Technical Recruiter',
    location: 'Lyon, France',
    bio: 'Passionate about connecting elite engineering talent with high-growth startups. Leveraging 10+ years of experience in the European tech ecosystem and AI-driven sourcing methodologies to build world-class teams. Expert in technical interviewing and strategic talent planning.',
    skills: ['AI Sourcing', 'Technical Interviewing', 'Strategic Planning', 'Pipeline Management', 'Executive Search', 'French (Native)', 'English (Fluent)'],
    emailNotifications: true,
    twoFactor: true,
    publicProfile: false,
  });

  // Remember sidebar state on desktop, default to false on mobile screens
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar_state');
      if (window.innerWidth < 768) return false;
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar_state', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const updateProfile = (updatedFields: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const syncAuthData = (authData: { name: string; email: string }) => {
    setProfile((prev) => ({
      ...prev,
      fullName: authData.name || prev.fullName,
      email: authData.email || prev.email,
    }));
  };

  return (
    <AppContext.Provider value={{ profile, updateProfile, syncAuthData, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};