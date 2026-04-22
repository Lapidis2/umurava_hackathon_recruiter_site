"use client";

import { useState } from "react";
import { UserCog, Loader2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface UpdateUserModalProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  onSuccess?: () => void;
}

export function UpdateUserModal({ user, onSuccess }: UpdateUserModalProps) {
  const { actions } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CORRECT STRUCTURE: userId at top level, updates inside 'data'
      await actions.updateUser({
        userId: user.id,
        data: {
          name: formData.name,
          email: formData.email,
          role: formData.role, // This allows overriding the role
        },
      });
      
      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
      >
        <UserCog size={16} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleUpdate} className="p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-900">Edit User Details</h3>
            <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-gray-400 uppercase">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-gray-400 uppercase">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-colors"
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-1">
              <label className="text-[12px] font-bold text-gray-400 uppercase">System Role</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-300 transition-colors appearance-none"
              >
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
