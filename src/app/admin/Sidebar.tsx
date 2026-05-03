"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const menuItems = [
  { name: "Overview", href: "/admin/dashboard", icon: "tabler:layout-dashboard" },
  { name: "Projects", href: "/admin/projects", icon: "tabler:briefcase" },
  { name: "Showcase", href: "/admin/projects/manage", icon: "tabler:stars" },
  { name: "Messages", href: "/admin/messages", icon: "tabler:mail" },
  { name: "Finance", href: "/admin/expenses", icon: "tabler:chart-bar" }, 
  { name: "Profile", href: "/admin/profile", icon: "tabler:user-cog" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0b0f1a] border-r border-slate-800 flex flex-col h-screen sticky top-0 z-50 shadow-2xl">
      <div className="p-8 flex-1">
        
        {/* BRANDING */}
        <div className="flex items-center gap-3 text-emerald-500 mb-12 px-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0b0f1a] font-black text-xl italic shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            YS
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-lg tracking-tighter uppercase italic">CONSOLE</span>
            <span className="text-emerald-500 text-[8px] font-black uppercase tracking-[0.3em] mt-1">Status: Active</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)] translate-x-1" 
                    : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon 
                  icon={item.icon} 
                  width="20" 
                  className={`transition-colors ${isActive ? "text-black" : "text-slate-600 group-hover:text-emerald-500"}`} 
                />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] italic">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* LOGOUT AREA */}
      <div className="p-8 border-t border-slate-800/50">
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 px-5 py-4 w-full text-rose-500 hover:bg-rose-500/5 rounded-2xl transition-all group border border-transparent hover:border-rose-500/20"
        >
          <Icon icon="tabler:logout" width="20" className="group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em] italic">
            Terminate Session
          </span>
        </button>
        
        <p className="text-[8px] text-slate-700 font-black uppercase tracking-widest text-center mt-6 italic">
          © 2026 YASHITH SASMITHA
        </p>
      </div>
    </aside>
  );
}