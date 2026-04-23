"use client";

import { motion } from "motion/react";
import { Bell, Menu } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  setIsMobileSidebarOpen: (value: boolean) => void;
}

export default function Header({ setIsMobileSidebarOpen }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="h-16 lg:h-20 bg-white border-b border-[#B5D4F4] flex items-center justify-between px-4 lg:px-8"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-[#E6F1FB] transition-colors"
        >
          <Menu className="w-6 h-6 text-[#0C2340]" />
        </motion.button>

        <h1 className="text-lg lg:text-2xl font-bold text-[#0C2340]">
          AI Resume Screener
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.info("You have 3 new notifications")}
          className="relative p-2 rounded-lg hover:bg-[#E6F1FB] transition-colors"
        >
          <Bell className="w-5 h-5 text-[#5A7A99]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </motion.button>

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1A6FD4] to-[#60A5FA] flex items-center justify-center text-white font-semibold">
          JD
        </div>
      </div>
    </motion.header>
  );
}