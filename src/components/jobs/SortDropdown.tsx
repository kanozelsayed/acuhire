import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SortDropdown: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-900 transition-colors pt-1">
      <span>Sort by:</span>
      <span className="font-semibold text-[#4F46E5]">AI Match Score</span>
      <ChevronDown size={14} className="text-[#4F46E5]" />
    </div>
  );
};