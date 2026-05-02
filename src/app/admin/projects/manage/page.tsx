"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#0b0f1a] p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold text-lg">{p.title}</h3>
              <p className="text-slate-500 text-sm">{p.tags?.join(", ")}</p>
            </div>
            <button 
              onClick={() => handleDelete(p.id)}
              className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
            >
              <Icon icon="tabler:trash" width="20" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}