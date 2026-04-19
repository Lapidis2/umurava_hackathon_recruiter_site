"use client"

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function Logout() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      window.location.href = "/auth/login"; 
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={loading}
      className="flex items-center gap-3"

    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  )
}
