import React from 'react';
import { mockJobs } from '@/data/jobs';
import { JobCard } from './JobCard';
import { LoadMoreButton } from './LoadMoreButton';

export const JobFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <LoadMoreButton />
    </div>
  );
};