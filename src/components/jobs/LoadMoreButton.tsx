import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick?: () => void;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center mt-8 mb-12">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 bg-white border border-blue-200 hover:border-blue-300 text-[#3B4E8E] text-xs font-semibold px-5 py-2.5 rounded-md transition-all shadow-sm"
      >
        <RefreshCw size={13} className="text-[#3B4E8E]" />
        <span>Load More Recommendations</span>
      </button>
    </div>
  );
};