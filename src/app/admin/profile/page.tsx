"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState([{ degree: "", institute: "", year: "" }]);
  const [certifications, setCertifications] = useState([{ name: "", issuer: "" }]);

  // Load existing data
  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "settings", "profile");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setBio(data.bio || "");
        setEducation(data.education || [{ degree: "", institute: "", year: "" }]);
        setCertifications(data.certifications || [{ name: "", issuer: "" }]);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "profile"), {
        bio,
        education,
        certifications,
        updatedAt: new Date()
      });
      alert("Profile synchronized successfully!");
    } catch (error) {
      alert("Update failed!");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-emerald-500 animate-pulse font-black italic">LOADING DATA...</div>;

  return (
    <div className="space-y-8 p-4 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Profile Configuration</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Update your professional identity & credentials</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-white text-black font-black px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 uppercase text-xs italic"
        >
          <Icon icon={saving ? "line-md:loading-twotone-loop" : "tabler:device-floppy"} width="20" />
          {saving ? "Syncing..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        
        {/* Bio & Professional Summary */}
        <div className="bg-[#0b0f1a] p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl space-y-6">
          <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest italic flex items-center gap-2">
            <Icon icon="tabler:user-bolt" /> About Me Bio
          </h3>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-[#020617] border border-slate-800 p-6 rounded-2xl text-slate-300 min-h-[200px] outline-none focus:border-emerald-500/50 transition font-medium"
            placeholder="Write your professional bio here..."
          />
        </div>

        {/* Education Section */}
        <div className="bg-[#0b0f1a] p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest italic flex items-center gap-2">
              <Icon icon="tabler:school" /> Education History
            </h3>
            <button 
              onClick={() => setEducation([...education, { degree: "", institute: "", year: "" }])}
              className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              <Icon icon="tabler:plus" />
            </button>
          </div>
          
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#020617] p-4 rounded-2xl border border-slate-800">
                <input placeholder="Degree" className="bg-transparent outline-none text-white text-sm font-bold" value={edu.degree} onChange={(e) => {
                  const newEdu = [...education]; newEdu[index].degree = e.target.value; setEducation(newEdu);
                }} />
                <input placeholder="Institute" className="bg-transparent outline-none text-slate-500 text-xs" value={edu.institute} onChange={(e) => {
                  const newEdu = [...education]; newEdu[index].institute = e.target.value; setEducation(newEdu);
                }} />
                <input placeholder="Year" className="bg-transparent outline-none text-emerald-500 text-xs font-mono" value={edu.year} onChange={(e) => {
                  const newEdu = [...education]; newEdu[index].year = e.target.value; setEducation(newEdu);
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-[#0b0f1a] p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest italic flex items-center gap-2">
              <Icon icon="tabler:certificate" /> Professional Certifications
            </h3>
            <button 
              onClick={() => setCertifications([...certifications, { name: "", issuer: "" }])}
              className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition"
            >
              <Icon icon="tabler:plus" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-4 bg-[#020617] p-5 rounded-2xl border border-slate-800 group hover:border-rose-500/30 transition">
                <div className="flex-1 space-y-1">
                  <input placeholder="Certification Name" className="w-full bg-transparent outline-none text-white text-sm font-bold" value={cert.name} onChange={(e) => {
                    const newCert = [...certifications]; newCert[index].name = e.target.value; setCertifications(newCert);
                  }} />
                  <input placeholder="Issuing Organization" className="w-full bg-transparent outline-none text-slate-500 text-xs" value={cert.issuer} onChange={(e) => {
                    const newCert = [...certifications]; newCert[index].issuer = e.target.value; setCertifications(newCert);
                  }} />
                </div>
                <Icon icon="tabler:award" className="text-rose-500 opacity-20 group-hover:opacity-100 transition" width="30" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}