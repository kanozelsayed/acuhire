// components/JobCard.tsx
import React from 'react';
import { Job } from '../data/jobs';
import { MapPin, DollarSign, Building2, Landmark, ArrowRight, Sparkles } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isHighMatch = job.match >= 90;

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden relative mb-5 transition-all duration-200 hover:shadow-md">
      {/* Top Right Match Badge */}
      <div className="absolute top-0 right-0">
        <div className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-bl-xl ${
          isHighMatch 
            ? 'bg-[#E6F9F4] text-[#0A8567]' 
            : 'bg-[#EEF2F6] text-[#4F5E74]'
        }`}>
          {isHighMatch && <Sparkles size={12} className="text-[#0A8567]" />}
          <span>{job.match}% Match</span>
        </div>
      </div>

      <div className="p-6 pb-4">
        {/* Upper Meta Section */}
        <div className="flex items-start gap-4">
          {/* Logo container */}
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
            
            {/* Context details row */}
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

        {/* Job Description */}
        <p className="mt-4 text-[13.5px] text-gray-600 leading-relaxed max-w-3xl">
          {job.description}
        </p>

        {/* Why You Match Section */}
        <div className="mt-5">
          <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
            Why You Match:
          </span>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  tag.missing 
                    ? 'bg-gray-100 text-gray-400 border border-gray-200' 
                    : isHighMatch 
                      ? 'bg-[#E0F7F1] text-[#0D7A60]' 
                      : 'bg-[#F0F2F5] text-[#4F5E74]'
                }`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Bottom Row */}
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