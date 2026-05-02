"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "tabler:layout-dashboard" },
  { name: "Projects", href: "/admin/projects", icon: "tabler:briefcase" },
  { name: "Manage Projects", href: "/admin/projects/manage", icon: "tabler:settings" },
  { name: "Messages", href: "/admin/messages", icon: "tabler:mail" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0b0f1a] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-emerald-500 mb-10">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-zinc-950 font-extrabold">YS</div>
          <span className="text-white font-bold text-xl tracking-tight">Admin Console</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                pathname === item.href 
                ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon icon={item.icon} width="22" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800/50">
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 px-4 py-3 w-full text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all font-medium"
        >
          <Icon icon="tabler:logout" width="22" />
          Logout
        </button>
      </div>
    </aside>
  );
}