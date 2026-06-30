"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { mockJobs } from '@/data/jobs';
import { 
  Building2, 
  Landmark, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle, 
  UploadCloud, 
  FileText, 
  Globe, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0];

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    currentTitle: '',
    yearsExp: '',
    expectedSalary: '',
    startDate: '',
    workType: 'Remote',
    resumeName: 'my_validated_resume_2026.pdf',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    interestReason: '',
    fitReason: '',
    notes: ''
  });

  // سحب البيانات تلقائياً كـ Fallback لتسهيل التقديم
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormData(prev => ({
        ...prev,
        fullName: localStorage.getItem('profile_fullName') || 'Kenzy Elsayed Mohamed',
        email: localStorage.getItem('profile_email') || 'kenzy.elsayed@example.com',
        phoneNumber: localStorage.getItem('profile_phone') || '+20 123 456 7890',
        location: localStorage.getItem('profile_location') || 'Cairo, Egypt'
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleValidation = () => {
    const localErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) localErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) localErrors.email = 'Valid email is required';
    if (!formData.phoneNumber.trim()) localErrors.phoneNumber = 'Phone number is required';
    if (!formData.currentTitle.trim()) localErrors.currentTitle = 'Current job title is required';
    if (!formData.yearsExp) localErrors.yearsExp = 'Years of experience is required';
    if (!formData.expectedSalary.trim()) localErrors.expectedSalary = 'Expected salary is required';
    if (!formData.interestReason.trim()) localErrors.interestReason = 'Please answer this question for the recruiter';

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-6 animate-fadeIn">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 shadow-sm">
          <CheckCircle size={36} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Application Submitted Successfully</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Your comprehensive profile and answers have been sent to the recruiter at <span className="font-semibold text-gray-900">{job.company}</span>.
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-sm mx-auto text-left flex items-start gap-3">
          <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-500 leading-normal">
            Tracking ID: <span className="font-mono text-gray-900 font-bold">ACH-2026-{job.id}</span><br />
            The recruiter will review your profile data match analysis parameters shortly.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => router.push('/jobs')}
            className="bg-black hover:bg-gray-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Return to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      <div>
        <Link 
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={13} /> Cancel and return to details
        </Link>
      </div>

      {/* معلومات الوظيفة في الأعلى */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg shrink-0">
            {job.categoryTag === 'FINTECH' ? <Landmark size={20} className="text-[#3B4E8E]" /> : <Building2 size={20} className="text-[#4F46E5]" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">{job.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{job.company} • {job.location}</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#E6F9F4] text-[#0A8567] px-2.5 py-1 rounded-md border border-[#B9F0E1]">
          <Sparkles size={11} />
          <span>{job.match}% Match Score</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#EDEFFE] text-[#4F46E5] text-[11px] font-bold flex items-center justify-center">1</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.fullName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.fullName && <span className="text-[10px] text-red-500 mt-1 block">{errors.fullName}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input 
                type="text" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.phoneNumber ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.phoneNumber && <span className="text-[10px] text-red-500 mt-1 block">{errors.phoneNumber}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: PROFESSIONAL INFORMATION */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#EDEFFE] text-[#4F46E5] text-[11px] font-bold flex items-center justify-center">2</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Professional Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Job Title *</label>
              <input 
                type="text" 
                name="currentTitle"
                placeholder="e.g. Frontend Developer"
                value={formData.currentTitle}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.currentTitle ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.currentTitle && <span className="text-[10px] text-red-500 mt-1 block">{errors.currentTitle}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Years of Experience *</label>
              <input 
                type="number" 
                name="yearsExp"
                value={formData.yearsExp}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.yearsExp ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.yearsExp && <span className="text-[10px] text-red-500 mt-1 block">{errors.yearsExp}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Expected Salary *</label>
              <input 
                type="text" 
                name="expectedSalary"
                placeholder="e.g. $120k"
                value={formData.expectedSalary}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.expectedSalary ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.expectedSalary && <span className="text-[10px] text-red-500 mt-1 block">{errors.expectedSalary}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Available Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Preferred Work Type</label>
              <div className="relative">
                <select 
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-200 text-xs rounded-lg appearance-none focus:outline-none focus:border-gray-400 cursor-pointer"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Onsite">Onsite</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DOCUMENTS & LINKS */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#EDEFFE] text-[#4F46E5] text-[11px] font-bold flex items-center justify-center">3</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Documents & Links</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Upload Resume *</label>
              <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText size={16} className="text-indigo-600 shrink-0" />
                  <span className="text-xs text-gray-700 font-medium truncate">{formData.resumeName}</span>
                </div>
                <button type="button" className="text-[10px] font-bold text-gray-400 hover:text-black">Replace</button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Upload Cover Letter</label>
              <div className="border border-dashed border-gray-200 rounded-lg p-2.5 bg-white flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                <UploadCloud size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium">Attach PDF</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Portfolio URL</label>
              <div className="relative">
                <Globe size={13} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="url" 
                  name="portfolioUrl"
                  placeholder="https://"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">LinkedIn Profile</label>
                <div className="relative">
                  {/* <Linkedin size={13} className="absolute left-3 top-3 text-gray-400" /> */}
                  <input 
                    type="url" 
                    name="linkedinUrl"
                    placeholder="https://"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">GitHub Profile URL</label>
                <div className="relative">
                  {/* <Github size={13} className="absolute left-3 top-3 text-gray-400" /> */}
                  <input 
                    type="url" 
                    name="githubUrl"
                    placeholder="https://"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ADDITIONAL QUESTIONS */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#EDEFFE] text-[#4F46E5] text-[11px] font-bold flex items-center justify-center">4</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Additional Questions</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Why are you interested in this role? *</label>
              <textarea 
                name="interestReason"
                rows={3}
                placeholder="Explain why you want to join this corporate pod..."
                value={formData.interestReason}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none ${errors.interestReason ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.interestReason && <span className="text-[10px] text-red-500 mt-1 block">{errors.interestReason}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">What makes you a good fit for this position?</label>
              <textarea 
                name="fitReason"
                rows={3}
                placeholder="Highlight your technical strengths..."
                value={formData.fitReason}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* ACTIONS FOOTER ROW */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-4 bg-gray-50/70">
          <button 
            type="button"
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            type="submit"
            className="bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-5 rounded-md flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            Submit Application <ChevronRight size={14} />
          </button>
        </div>

      </form>
    </div>
  );
}