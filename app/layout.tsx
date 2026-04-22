import { DM_Sans } from "next/font/google"; // 1. Import the font
import { cn } from "@/lib/utils";

import './globals.css'
import { SidebarProvider } from '@/context/sidebar-context';
import { AuthProvider } from "@/context/AuthContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // This creates the CSS variable
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          dmSans.variable, // Make sure your font variable is here
        )}
        suppressHydrationWarning 
      >
        <AuthProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
