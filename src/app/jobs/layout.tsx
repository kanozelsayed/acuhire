import React from 'react';
import { CandidateLayout } from '@/components/layout/CandidateLayout';

export default function JobsModuleLayout({ children }: { children: React.ReactNode }) {
  return <CandidateLayout>{children}</CandidateLayout>;
}