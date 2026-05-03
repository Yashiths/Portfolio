"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, updateDoc, doc, orderBy, query, where } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const q = query(
      collection(db, "projects"), 
      where("status", "==", "Completed"), 
    );

    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleVisibility = async (id: string, currentValue: boolean) => {
    try {
      await updateDoc(doc(db, "projects", id), {
        isFeatured: !currentValue
      });
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Portfolio Showcase</h1>
          <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Select Featured Works (Completed Only)
          </p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
           <p className="text-[10px] text-slate-500 font-bold uppercase">Total Ready</p>
           <p className="text-xl font-black text-white">{projects.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full py-20 text-center text-slate-600 animate-pulse font-black uppercase tracking-widest">
             Scanning for completed projects...
           </div>
        ) : projects.map((p) => (
          <div 
            key={p.id} 
            className={`relative bg-[#0b0f1a] p-6 rounded-[2rem] border transition-all duration-500 ${
              p.isFeatured ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/5" : "border-slate-800 opacity-60"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${p.isFeatured ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-600"}`}>
                  <Icon icon="tabler:discount-check-filled" width="24" />
                </div>
                <div className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.isFeatured ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-500"}`}>
                  {p.isFeatured ? "Public" : "Hidden"}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-tight">{p.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">
                  {p.tags?.join(" • ")}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Visibility</span>
                
                {/* Modern Toggle Switch */}
                <button
                  onClick={() => toggleVisibility(p.id, p.isFeatured)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 ${
                    p.isFeatured ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-slate-800"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      p.isFeatured ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && projects.length === 0 && (
        <div className="text-center py-20 bg-[#0b0f1a] rounded-[3rem] border border-dashed border-slate-800">
           <Icon icon="tabler:alert-circle" className="mx-auto text-slate-700 mb-4" width="50" />
           <p className="text-slate-500 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
             No completed projects found. Change status to "Completed" in Projects tab to see them here.
           </p>
        </div>
      )}
    </div>
  );
}