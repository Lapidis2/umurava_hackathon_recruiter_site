import { StatColor } from "@/types";
import { BarChart3, CalendarDays, LayoutDashboard, Mail, Star, Users } from "lucide-react";

export const STATS = [
  { label: "Resumes Uploaded", value: "10",   iconName: "upload"   as const, color: "blue" as StatColor },
  { label: "Screened by AI",   value: "7/10", iconName: "sparkles" as const, color: "violet" as StatColor, progress: 70 },
  { label: "Shortlisted",      value: "4",    iconName: "star"     as const, color: "indigo" as StatColor },
  { label: "Emails Sent",      value: "2",    iconName: "mail"     as const, color: "emerald" as StatColor },
];
