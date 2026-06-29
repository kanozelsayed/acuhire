import React from 'react';

interface TagItem {
  text: string;
  missing?: boolean;
}

interface MatchTagsProps {
  tags: TagItem[];
  isHighMatch: boolean;
}

export const MatchTags: React.FC<MatchTagsProps> = ({ tags, isHighMatch }) => {
  return (
    <div className="mt-5">
      <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
        Why You Match:
      </span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              tag.missing 
                ? 'bg-[#F4F4F5] text-[#A1A1AA] border border-gray-200' 
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
  );
};