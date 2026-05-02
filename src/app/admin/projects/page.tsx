"use client";
import React, { useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // පින්තූරේ ලින්ක් එක විතරයි
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // කෙලින්ම Firestore එකට විස්තර ටික දානවා
      await addDoc(collection(db, "projects"), {
        title,
        description: desc,
        tags: tech.split(",").map(t => t.trim()),
        github,
        imageUrl, // මෙතනට අපි දෙන ලින්ක් එක යනවා
        createdAt: serverTimestamp(),
      });

      alert("Project added to Firestore successfully! 🚀");
      setTitle(""); setDesc(""); setTech(""); setGithub(""); setImageUrl("");
    } catch (error) {
      console.error(error);
      alert("Error saving data to Firestore!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-700">
      <div className="bg-[#0b0f1a] p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input type="text" placeholder="Project Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500" required />
            <textarea placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white h-40 outline-none focus:border-emerald-500" required />
          </div>

          <div className="space-y-4">
            <input type="text" placeholder="Tech Stack (e.g. React, Next.js)" value={tech} onChange={(e)=>setTech(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500" required />
            <input type="url" placeholder="GitHub/Live Link" value={github} onChange={(e)=>setGithub(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500" required />
            <input type="text" placeholder="Image URL (e.g. /projects/my-img.jpg)" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white outline-none focus:border-emerald-500" required />
          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl transition active:scale-95">
              {loading ? "Saving..." : "Save Project Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}