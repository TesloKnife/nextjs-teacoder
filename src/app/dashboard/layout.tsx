import type { ReactNode } from "react";
import { Sidebar } from "../components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-row min-h-[calc(100vh-2rem)] border-4 border-blue-500 rounded-xl m-4 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-white p-8">{children}</main>
    </div>
  );
}
