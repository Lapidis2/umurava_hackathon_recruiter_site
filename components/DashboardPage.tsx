'use client';

import { motion } from 'motion/react';
import { Upload, Sparkles, Star, Mail } from 'lucide-react';

type Props = {
  totalResumes: number;
  screenedCount: number;
  shortlistedCount: number;
  emailedCount: number;
  toast: {
    success: (msg: string) => void;
  };
};

export default function DashboardPage({
  totalResumes,
  screenedCount,
  shortlistedCount,
  emailedCount,
  toast,
}: Props) {
  const progress = totalResumes
    ? Math.round((screenedCount / totalResumes) * 100)
    : 0;

  return (
    <div className="p-4 lg:p-8 space-y-6">

      {/* ===== METRICS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

        {[
          { label: 'Resumes Uploaded', value: totalResumes, icon: Upload },
          { label: 'Screened by AI', value: `${screenedCount}/${totalResumes}`, icon: Sparkles },
          { label: 'Shortlisted', value: shortlistedCount, icon: Star },
          { label: 'Emails Sent', value: emailedCount, icon: Mail },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-[#B5D4F4]"
          >
            <div className="flex items-center gap-3 mb-4">
              <m.icon className="w-6 h-6 text-[#1A6FD4]" />
              <span className="text-sm text-[#5A7A99]">{m.label}</span>
            </div>

            <div className="text-2xl font-bold text-[#0C2340]">
              {m.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== JOB DESCRIPTION ===== */}
      <div className="bg-white p-6 rounded-xl border border-[#B5D4F4] space-y-4">

        <h3 className="font-semibold text-[#0C2340]">Job Description</h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="border border-[#B5D4F4] rounded-lg p-3">
            <option>Senior Product Designer</option>
          </select>

          <select className="border border-[#B5D4F4] rounded-lg p-3">
            <option>Product Design</option>
          </select>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border border-[#B5D4F4] rounded-lg p-3 min-h-30"
          placeholder="Paste job description here..."
        />

        {/* Button */}
        <button
          onClick={() => toast.success('Screening started')}
          className="px-5 py-3 bg-[#1A6FD4] text-white rounded-lg"
        >
          Screen Against This JD
        </button>
      </div>

      {/* ===== UPLOAD SECTION ===== */}
      <div className="bg-white p-6 rounded-xl border border-[#B5D4F4]">

        <div className="border-2 border-dashed border-[#B5D4F4] rounded-xl p-10 text-center">
          <Upload className="mx-auto w-10 h-10 text-[#1A6FD4] mb-3" />

          <p className="text-[#0C2340]">
            Drop resumes here or click to upload
          </p>

          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOCX
          </p>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Screening {screenedCount} of {totalResumes} resumes...</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#1A6FD4] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}