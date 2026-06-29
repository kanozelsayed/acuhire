import React from 'react';
import { Job } from '@/data/jobs';
import { MatchBadge } from './MatchBadge';
import { MatchTags } from './MatchTags';
import { MapPin, DollarSign, Building2, Landmark, ArrowRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isHighMatch = job.match >= 90;

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden relative mb-5 transition-all duration-200 hover:shadow-md">
      <MatchBadge score={job.match} />

      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${isHighMatch ? 'bg-[#EEF2FF]' : 'bg-[#F1F3F9]'}`}>
            {job.categoryTag === 'FINTECH' ? (
              <Landmark size={24} className="text-[#3B4E8E]" />
            ) : (
              <Building2 size={24} className="text-[#4F46E5]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[17px] font-bold text-gray-900">{job.title}</h3>
              <span className="text-[10px] font-bold bg-[#EFEFEF] text-gray-500 px-1.5 py-0.5 rounded tracking-wider">
                {job.categoryTag}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{job.company}</span>
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <MapPin size={14} /> {job.location}
              </span>
              <span className="flex items-center gap-0.5 text-gray-400 text-xs">
                <DollarSign size={14} /> {job.salary}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[13.5px] text-gray-600 leading-relaxed max-w-3xl">
          {job.description}
        </p>

        <MatchTags tags={job.tags} isHighMatch={isHighMatch} />
      </div>

      <div className="border-t border-gray-100 px-6 py-3 flex justify-end items-center gap-4 bg-[#FAFAFA]">
        <button className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
          View Details
        </button>
        <button className="bg-black hover:bg-gray-800 text-white text-xs font-medium py-2 px-4 rounded-md flex items-center gap-2 transition-all shadow-sm">
          Apply Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};