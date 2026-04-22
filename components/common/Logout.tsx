"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface LogoutProps {
  className?: string;
}

export default function Logout({ className }: LogoutProps) {
  // Pull actions and loading state from your new robust context
  const { actions, isPending } = useAuth();

  return (
    <button
      onClick={() => actions.logout()}
      disabled={isPending}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors",
        "text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LogOut size={16} />
      )}
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
