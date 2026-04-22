"use client";

import { useState } from "react";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface BanUserProps {
  userId: string;
  isBanned: boolean;
  onSuccess?: () => void;
}

export function BanUserToggle({ userId, isBanned, onSuccess }: BanUserProps) {
  const { actions } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isBanned) {
        await actions.unbanUser({ userId });
      } else {
        await actions.banUser({ 
          userId, 
          banReason: "Administrator action", 
          banExpiresIn: 3600 * 24 * 7 // Default 7 days
        });
      }
      onSuccess?.();
    } catch (err) {
      console.error("Ban toggle failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all",
        isBanned 
          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" 
          : "bg-amber-50 text-amber-600 hover:bg-amber-100"
      )}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : isBanned ? (
        <ShieldCheck size={14} />
      ) : (
        <ShieldAlert size={14} />
      )}
      {isBanned ? "Lift Ban" : "Ban User"}
    </button>
  );
}
