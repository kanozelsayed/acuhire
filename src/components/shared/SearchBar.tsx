"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get('search') || '';
  const [query, setQuery] = useState(currentSearch);

  useEffect(() => {
    setQuery(currentSearch);
  }, [currentSearch]);

  // دالة المراقبة الفورية أثناء الكتابة أو المسح
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (value.trim()) {
      // تحديث الـ URL فوراً أثناء الكتابة
      router.push(`/jobs?search=${encodeURIComponent(value.trim())}`);
    } else {
      // أول ما تمسحي الكلام كله يرجع يعرض الصفحة كاملة تلقائياً
      router.push('/jobs');
    }
  };

  const handleClear = () => {
    setQuery('');
    router.push('/jobs'); // تفريغ فوري وعودة للصفحة الأساسية
  };

  return (
    <div className="relative w-full max-w-md hidden sm:block">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search jobs, companies, or skills..."
        value={query}
        onChange={(e) => handleInputChange(e.target.value)} // تشغيل المراقبة الفورية هنا
        className="w-full pl-9 pr-8 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white transition-all text-gray-950"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};