
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}
