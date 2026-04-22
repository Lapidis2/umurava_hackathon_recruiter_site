"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface DeleteUserProps {
  userId: string;
  userName: string;
  onSuccess?: () => void;
}

export function DeleteUserButton({ userId, userName, onSuccess }: DeleteUserProps) {
  const { actions } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await actions.deleteUser({ userId });
      onSuccess?.();
      setIsConfirming(false);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
        <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
          <AlertTriangle size={12} /> Confirm Delete?
        </span>
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="text-[11px] font-bold text-red-600 hover:underline disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Yes"}
        </button>
        <button 
          onClick={() => setIsConfirming(false)}
          className="text-[11px] font-bold text-gray-400"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title={`Delete ${userName}`}
    >
      <Trash2 size={16} />
    </button>
  );
}
