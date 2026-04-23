"use client";

import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Star,
  Mail,
  Calendar,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
   activeNav: string;
  setActiveNav: (value: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export default function Sidebar({
  activeNav,
  setActiveNav,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "All Candidates" },
    { icon: Star, label: "Shortlisted" },
    { icon: Mail, label: "Emailed" },
    { icon: Calendar, label: "Interviews" },
    { icon: BarChart3, label: "Reports" },
  ];

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: isMobileOpen ? 0 : -240 }}
      className="fixed lg:relative w-60 h-full bg-white border-r border-[#B5D4F4] flex flex-col z-50 lg:translate-x-0 lg:z-auto"
    >
      <div className="p-6 border-b border-[#B5D4F4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#1A6FD4] to-[#3B82F6] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#0C2340]">RecruitAI</div>
            <div className="text-xs text-[#5A7A99]">Smart Hiring</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            onClick={() => {
              setActiveNav(item.label);
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
              activeNav === item.label
                ? "bg-[#E6F1FB] text-[#1A6FD4] border-l-4 border-[#1A6FD4]"
                : "text-[#5A7A99] hover:bg-[#F8FAFB]"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#B5D4F4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A6FD4] to-[#60A5FA] flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <div className="font-medium text-[#0C2340] text-sm">
              Jane Doe
            </div>
            <div className="text-xs text-[#5A7A99]">HR Manager</div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}