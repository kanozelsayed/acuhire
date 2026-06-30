'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SortDropdown } from '@/components/jobs/SortDropdown';
import { JobFeed } from '@/components/jobs/JobFeed';

export default function JobsPage() {
  return (
    <div className="space-y-2 animate-fadeIn">
      {/* Page Heading configuration */}
      <PageHeader 
        title="Recommended Roles" 
        description="Curated based on your skills, experience, and career goals."
      >
        <SortDropdown />
      </PageHeader>

      {/* Main jobs feed listings grid component */}
      <JobFeed />
    </div>
  );
}