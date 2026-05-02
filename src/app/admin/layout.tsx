"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar"; 
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current page is the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Only redirect if not on login page and no user is found
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [user, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  // If it's the login page, render only the children (the login form) without the sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-[#020617]">{children}</div>;
  }

  // If not logged in and not on login page, show nothing during redirect
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      {/* Sidebar is only shown for authenticated dashboard routes */}
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-200">Yashith Sasmitha</p>
              <p className="text-xs text-emerald-500 font-bold uppercase tracking-tighter">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}