import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar"; // Import your Topbar
import "@/app/globals.css";
import { SidebarProvider } from "@/context/sidebar-context";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RecruitAI — Smart Hiring",
  description: "AI-powered resume screening and candidate management",
};

// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // 1. Root container: Full screen, no body scroll
    <div className="flex h-screen w-full overflow-hidden bg-[#f8f9fa]">
      
      {/* 2. Sidebar: Fixed width, doesn't shrink */}
      <Sidebar />

      {/* 3. Main Wrapper: Flex column to stack Topbar and Content */}
      <main className="flex flex-col flex-1 min-w-0 h-full">
        
        {/* 4. Topbar: Stays at the top of the main flex container */}
        <Suspense fallback={<div className="h-[68px] w-full border-b bg-white" />}>
           <Topbar />
        </Suspense>

        {/* 5. Scrollable Content Area: This is the ONLY thing that scrolls */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}

