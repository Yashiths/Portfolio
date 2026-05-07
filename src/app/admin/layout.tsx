"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar"; 
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
// Head component එක පාවිච්චි කරන එක තමයි නිවැරදි ක්‍රමය
import Head from "next/head"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
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

  if (isLoginPage) {
    return (
      <>
        <title>Admin Login | Yashith Sasmitha</title>
        <div className="min-h-screen bg-[#020617]">{children}</div>
      </>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
    
      <title>Admin Console | Yashith Sasmitha</title>
      <link rel="icon" href="/images/logo/yslogo.png" />
      
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-0.5">System Secure</h2>
            <h2 className="text-sm font-black text-white uppercase italic tracking-wider">Control Center</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white uppercase italic leading-none">Yashith Sasmitha</p>
              <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-1 text-right">Super Admin</p>
            </div>

            <div className="w-10 h-10 bg-[#0b0f1a] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-500/5">
               <img src="/favicon.ico" alt="Admin" className="w-6 h-6 object-contain" />
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}