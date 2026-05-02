"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Real-time states for stats
  const [projectCount, setProjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  // Fetch real-time counts from Firestore
  useEffect(() => {
    if (!user) return;

    // Listen to Projects count
    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => {
      setProjectCount(snap.size);
    });

    // Listen to Messages count
    const unsubMessages = onSnapshot(collection(db, "messages"), (snap) => {
      setMessageCount(snap.size);
    });

    return () => {
      unsubProjects();
      unsubMessages();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, {user.email?.split('@')[0]}</p>
        </div>
        <button 
          onClick={() => router.push('/admin/projects')}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          + Add Project
        </button>
      </div>

      {/* Top Stats - Linked to Live Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Projects", value: projectCount, sub: "Live from Firestore", color: "text-emerald-400" },
          { label: "Tasks", value: "05", sub: "Pending tasks", color: "text-blue-400" },
          { label: "Views", value: "128", sub: "Static data", color: "text-amber-400" },
          { label: "Messages", value: messageCount, sub: "In your inbox", color: "text-rose-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0b0f1a] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className={`${stat.color} text-xs mt-1 font-medium`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Projects Table */}
        <div className="lg:col-span-2 bg-[#0b0f1a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 bg-slate-800/20">
            <h3 className="text-lg font-bold text-white">Project Quick View</h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-slate-800/50 hover:bg-slate-800/20 transition">
                  <td className="p-4 font-medium italic text-slate-500 text-sm">Use "Projects" tab to manage detailed list</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500">
                      Operational
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-[#0b0f1a] p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="text-white font-bold mb-4">System Status</h3>
            <div className="flex items-center justify-between mb-2">
               <span className="text-4xl font-bold text-white">100%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[100%]"></div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium uppercase tracking-tighter">Firebase & Next.js connected</p>
          </div>

          {/* Helper Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-white font-bold text-lg leading-tight">Admin System Live</h3>
              <p className="text-emerald-100 text-xs mt-2 opacity-80">You can now add projects and read messages in real-time.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-white/10 text-9xl font-bold tracking-tighter italic">!</div>
          </div>
        </div>

      </div>
    </div>
  );
}