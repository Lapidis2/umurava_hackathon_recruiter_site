"use client";

import { 
  Upload, 
  Sparkles, 
  Star, 
  Mail, } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatColor } from "@/types";

const IconLib = {
  upload: Upload,
  sparkles: Sparkles,
  star: Star,
  mail: Mail,
};


interface StatCardProps {
  label: string;
  value: string | number;
  iconName: keyof typeof IconLib;
  color: StatColor;
  progress?: number;
}

const colorMap = {
  blue: {
    bg: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-200",
    text: "text-blue-600"
  },
  violet: {
    bg: "from-violet-600 to-violet-500",
    shadow: "shadow-violet-200",
    text: "text-violet-600"
  },
  indigo: {
    bg: "from-indigo-600 to-indigo-500",
    shadow: "shadow-indigo-200",
    text: "text-indigo-600"
  },
  emerald: {
    bg: "from-emerald-600 to-emerald-500",
    shadow: "shadow-emerald-200",
    text: "text-emerald-600"
  },
};

export function StatCard({ label, value, iconName, color, progress }: StatCardProps) {
  const Icon = IconLib[iconName];
  const theme = colorMap[color];

  return (
    <motion.article 
      whileHover={{ y: -4 }}
      className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all"
    >
      <div className="flex justify-between items-start">
        {/* Icon Header */}
        <header className={cn(
          "w-11 h-11 rounded-xl bg-linear-to-br flex items-center justify-center shadow-lg shadow-opacity-40",
          theme.bg,
          theme.shadow
        )}>
          <Icon className="text-white" size={20} strokeWidth={2.5} />
        </header>

        {/* Progress Circle */}
        {progress !== undefined && (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-100" />
              <circle 
                cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" 
                strokeDasharray={125.6} 
                strokeDashoffset={125.6 - (125.6 * progress) / 100}
                className={cn("transition-all duration-1000", theme.text)} 
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-gray-600">{progress}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">{value}</h2>
        <p className="text-[13px] font-medium text-gray-400">{label}</p>
      </div>
    </motion.article>
  );
}
