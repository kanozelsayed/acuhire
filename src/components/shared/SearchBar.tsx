import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="flex-1 max-w-xl mx-4 hidden sm:block">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs, skills, or companies..."
          className="w-full bg-[#F1F3F5] border-none rounded-md pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder-gray-500 text-gray-900"
        />
      </div>
    </div>
  );
};