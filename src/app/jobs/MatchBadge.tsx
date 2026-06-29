import React from 'react';
import { Sparkles } from 'lucide-react';

interface MatchBadgeProps {
  score: number;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ score }) => {
  const isHighMatch = score >= 90;

  return (
    <div className="absolute top-0 right-0">
      <div className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-bl-xl ${
        isHighMatch ? 'bg-[#E6F9F4] text-[#0A8567]' : 'bg-[#EEF2F6] text-[#4F5E74]'
      }`}>
        {isHighMatch && <Sparkles size={12} className="text-[#0A8567]" />}
        <span>{score}% Match</span>
      </div>
    </div>
  );
};