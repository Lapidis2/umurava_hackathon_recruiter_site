"use client";

import { useState } from "react";
import { Sparkles, Briefcase, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button"; // Your custom button

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]


 function JobDescriptionForm() {
  const [loading, setLoading] = useState(false);

  const handleScreening = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate AI processing delay
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      <form onSubmit={handleScreening} className="p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FileText size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
            <p className="text-sm text-gray-400">Define the role to start AI candidate screening</p>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              <Briefcase size={14} /> Job Title
            </label>
            <select className="w-full h-12 px-4 bg-gray-50/50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-all appearance-none cursor-pointer text-gray-700 font-medium">
              <option>Senior Product Designer</option>
              <option>Fullstack Engineer</option>
              <option>HR Manager</option>
            </select>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              <Building2 size={14} /> Department
            </label>
            <select className="w-full h-12 px-4 bg-gray-50/50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-all appearance-none cursor-pointer text-gray-700 font-medium">
              <option>Product Design</option>
              <option>Engineering</option>
              <option>Operations</option>
            </select>
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Role Requirements
          </label>
          <textarea 
            placeholder="Paste job description here..."
            className="w-full min-h-40 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-300 transition-all resize-none text-gray-700 placeholder:text-gray-300"
          />
        </div>

        {/* Action Button - Using your component */}
        <div className="pt-2">
          <Button 
            type="submit"
            disabled={loading}
            className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <>
                <Sparkles size={18} />
                Screen Against This JD
              </>
            )}
          </Button>
          <span className="text-sm text-gray-400 ml-3">AI will analyze resumes based on this job description</span>  
        </div>
      </form>
    </div>
  );
}

export default JobDescriptionForm;
