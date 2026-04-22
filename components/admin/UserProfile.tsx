"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Settings, 
  User, 
  LogOut, 
  CreditCard, 
  ShieldCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logout from "../common/Logout";


interface UserProfileProps {
  name: string;
  email: string;
  role: string;
}

export function UserProfile({ name, email, role }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 lg:border lg:border-gray-100 rounded-xl lg:pl-1.5 lg:pr-3 lg:py-1.5 transition-all group",
          isOpen ? "lg:bg-gray-50 lg:border-indigo-200" : "lg:bg-white hover:bg-gray-50"
        )}
      >
        <div className="w-8 h-8 lg:w-7 lg:h-7 rounded-lg bg-linear-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm">
            {name.split(" ").map(n => n[0]).join("").toUpperCase()}
        </div>
        <div className="hidden lg:flex flex-col items-start text-left">
          <span className="text-[12.5px] font-semibold text-gray-900 leading-none">{name}</span>
          <span className="text-[10px] text-gray-400 font-medium mt-0.5">{role}</span>
        </div>
        <ChevronDown 
          size={13} 
          className={cn(
            "hidden lg:block text-gray-300 transition-transform duration-200",
            isOpen && "rotate-180 text-indigo-500"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 z-60"
          >
            {/* User Info Header */}
            <div className="px-4 py-2 mb-2 border-b border-gray-50">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Account</p>
              <p className="text-[13px] font-semibold text-gray-700 truncate">{email}</p>
            </div>

            {/* Menu Items */}
            <div className="px-1.5 space-y-0.5">
              <DropdownItem icon={User} label="Profile" />
              <DropdownItem icon={Settings} label="Settings" />
              <DropdownItem icon={CreditCard} label="Billing" />
              <DropdownItem icon={ShieldCheck} label="Security" />
            </div>

            <div className="my-2 border-t border-gray-50" />

            <div className="px-1.5">
              <Logout />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
      <Icon size={16} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}
