"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";

interface CMSData {
  heroGreeting: string;
  heroTitle: string;
  heroDescription: string;
  cvUrl: string;
  statsYearsVal: number;
  statsYearsLabel: string;
  statsProjectsVal: number;
  statsProjectsLabel: string;
  statsQuote: string;
  footerBio: string;
  contactEmail: string;
  contactPhone: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
}

const defaultCMSData: CMSData = {
  heroGreeting: "Hello, I am Yashith Sasmitha",
  heroTitle: "Full Stack Web Developer specializing in React",
  heroDescription: "I build modern, scalable web applications using React.js, Next.js, and Firebase. Focused on creating clean user interfaces and robust backend integrations.",
  cvUrl: "https://drive.google.com/file/d/1Xqm9HTOQXHr3ocTSFcykMhPcwUrusIa6/view?usp=drive_link",
  statsYearsVal: 2,
  statsYearsLabel: "Years Experience",
  statsProjectsVal: 15,
  statsProjectsLabel: "Projects Done",
  statsQuote: "Driven by fitness and code, I believe in consistency and continuous improvement.",
  footerBio: "Building modern web applications with a focus on performance and exceptional user experiences.",
  contactEmail: "yashith@example.com",
  contactPhone: "+94 7X XXX XXXX",
  socialLinkedin: "https://linkedin.com/in/yashith-sasmitha",
  socialFacebook: "#",
  socialInstagram: "#",
  socialTwitter: "#",
};

export default function VisualCMS() {
  const [formData, setFormData] = useState<CMSData>(defaultCMSData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "social">("hero");

  // Fetch current CMS configurations
  useEffect(() => {
    const fetchCMSData = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "portfolio_content", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            heroGreeting: data.heroGreeting ?? defaultCMSData.heroGreeting,
            heroTitle: data.heroTitle ?? defaultCMSData.heroTitle,
            heroDescription: data.heroDescription ?? defaultCMSData.heroDescription,
            cvUrl: data.cvUrl ?? defaultCMSData.cvUrl,
            statsYearsVal: Number(data.statsYearsVal) ?? defaultCMSData.statsYearsVal,
            statsYearsLabel: data.statsYearsLabel ?? defaultCMSData.statsYearsLabel,
            statsProjectsVal: Number(data.statsProjectsVal) ?? defaultCMSData.statsProjectsVal,
            statsProjectsLabel: data.statsProjectsLabel ?? defaultCMSData.statsProjectsLabel,
            statsQuote: data.statsQuote ?? defaultCMSData.statsQuote,
            footerBio: data.footerBio ?? defaultCMSData.footerBio,
            contactEmail: data.contactEmail ?? defaultCMSData.contactEmail,
            contactPhone: data.contactPhone ?? defaultCMSData.contactPhone,
            socialLinkedin: data.socialLinkedin ?? defaultCMSData.socialLinkedin,
            socialFacebook: data.socialFacebook ?? defaultCMSData.socialFacebook,
            socialInstagram: data.socialInstagram ?? defaultCMSData.socialInstagram,
            socialTwitter: data.socialTwitter ?? defaultCMSData.socialTwitter,
          });
        }
      } catch (error) {
        console.error("Error fetching CMS content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("Val") ? Number(value) : value,
    }));
  };

  const saveContent = async () => {
    if (!db) {
      alert("Firebase is not initialized.");
      return;
    }
    setSaving(true);
    setSaveSuccess(false);
    try {
      await setDoc(doc(db, "portfolio_content", "homepage"), {
        ...formData,
        updatedAt: new Date(),
      }, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (error) {
      console.error("Error saving CMS configurations:", error);
      alert("Failed to write data back to database. Please check permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveContent();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-slate-500">
        <Icon icon="line-md:loading-twotone-loop" className="text-emerald-500 text-5xl mb-4" />
        <span className="font-black uppercase tracking-widest text-xs animate-pulse">Syncing Visual Canvas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white pb-12">
      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            Visual CMS Canvas
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Real-time homepage editor & layout sync
          </p>
        </div>
        <button
          type="button"
          onClick={saveContent}
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 px-8 py-3.5 rounded-2xl font-black uppercase italic text-xs tracking-wider transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          {saving ? (
            <Icon icon="line-md:loading-twotone-loop" width="18" />
          ) : (
            <Icon icon="tabler:device-floppy" width="18" />
          )}
          {saving ? "Deploying..." : "Save & Update"}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm animate-in fade-in zoom-in-95 duration-300">
          <Icon icon="tabler:circle-check" width="22" />
          <span className="font-bold">Database updated successfully! Changes are live on the website in real-time.</span>
        </div>
      )}

      {/* Main CMS Layout (Dual-Pane Editor) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form Controls (xl:col-span-5) */}
        <div className="xl:col-span-5 bg-[#0b0f1a] border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(["hero", "stats", "social"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-white text-black font-black" 
                    : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab === "hero" ? "Hero Banner" : tab === "stats" ? "Stats Count" : "Social Links"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            
            {/* HERO SETTINGS TAB */}
            {activeTab === "hero" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-500 border-b border-slate-800 pb-2">Hero Section Config</h3>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Greeting Text</label>
                  <input
                    type="text"
                    name="heroGreeting"
                    value={formData.heroGreeting}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 font-medium text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Main Heading</label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 font-bold text-sm transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description Paragraph</label>
                  <textarea
                    name="heroDescription"
                    rows={4}
                    value={formData.heroDescription}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">CV File URL</label>
                  <input
                    type="url"
                    name="cvUrl"
                    value={formData.cvUrl}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 font-mono text-sm transition-all"
                  />
                </div>
              </div>
            )}

            {/* STATS SETTINGS TAB */}
            {activeTab === "stats" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-500 border-b border-slate-800 pb-2">Stats Counter Config</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Years Value</label>
                    <input
                      type="number"
                      name="statsYearsVal"
                      value={formData.statsYearsVal}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Years Label</label>
                    <input
                      type="text"
                      name="statsYearsLabel"
                      value={formData.statsYearsLabel}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Projects Value</label>
                    <input
                      type="number"
                      name="statsProjectsVal"
                      value={formData.statsProjectsVal}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Projects Label</label>
                    <input
                      type="text"
                      name="statsProjectsLabel"
                      value={formData.statsProjectsLabel}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Personal Quote</label>
                  <textarea
                    name="statsQuote"
                    rows={3}
                    value={formData.statsQuote}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm leading-relaxed resize-none"
                  />
                </div>
              </div>
            )}

            {/* SOCIAL SETTINGS TAB */}
            {activeTab === "social" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-500 border-b border-slate-800 pb-2">Footer Contact & Socials</h3>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Footer Bio Description</label>
                  <textarea
                    name="footerBio"
                    rows={2}
                    value={formData.footerBio}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm leading-relaxed resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Phone/Chat</label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    name="socialLinkedin"
                    value={formData.socialLinkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-emerald-400 font-mono text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Facebook</label>
                    <input type="text" name="socialFacebook" value={formData.socialFacebook} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-300 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Instagram</label>
                    <input type="text" name="socialInstagram" value={formData.socialInstagram} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-300 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Twitter/X</label>
                    <input type="text" name="socialTwitter" value={formData.socialTwitter} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-300 text-xs" />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: Real-Time Live Visual Mirror (xl:col-span-7) */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Title / Controls for Mockup */}
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Mockup Preview
              </span>
              <span className="text-[9px] font-bold text-slate-500">Desktop Representation</span>
            </div>

            {/* Visual Canvas Sandbox */}
            <div className="p-8 space-y-12 bg-[#000510] text-white pointer-events-none select-none relative max-h-[600px] overflow-y-auto custom-scrollbar">
              
              {/* Visual Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

              {/* 1. HERO CANVAS PIECE */}
              <div className="space-y-4 border border-dashed border-slate-800/80 p-6 rounded-2xl relative bg-slate-950/20">
                <span className="absolute -top-3 left-4 bg-emerald-500 text-zinc-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">Hero Section</span>
                
                <div className="flex gap-2 items-center text-xs mt-2 text-slate-400">
                  <span>👋</span>
                  <span>{formData.heroGreeting}</span>
                </div>
                
                <h1 className="font-bold text-3xl text-white leading-tight">
                  {formData.heroTitle?.split(" ").map((w, index) => {
                    const keys = ["Full", "Stack", "Developer", "React", "Web"];
                    const cl = w.replace(/[^a-zA-Z]/g, "");
                    const matches = keys.includes(cl);
                    return <span key={index} className={matches ? "text-primary" : ""}>{w} </span>;
                  })}
                </h1>
                
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg line-clamp-3">
                  {formData.heroDescription}
                </p>
                
                <div className="flex gap-4">
                  <span className="px-5 py-2 bg-primary text-black font-bold text-[10px] rounded-lg">View Work</span>
                  <span className="px-5 py-2 border border-primary text-primary font-bold text-[10px] rounded-lg">Let's Talk</span>
                </div>
              </div>

              {/* 2. STATS CANVAS PIECE */}
              <div className="grid grid-cols-2 gap-4 border border-dashed border-slate-800/80 p-6 rounded-2xl relative bg-slate-950/20">
                <span className="absolute -top-3 left-4 bg-emerald-500 text-zinc-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">Stats Counters</span>
                
                <div className="bg-[#0b1120] border border-white/5 p-4 rounded-2xl text-center">
                  <h3 className="text-primary text-3xl font-black mb-1">{formData.statsYearsVal}+</h3>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black">{formData.statsYearsLabel}</p>
                </div>
                <div className="bg-[#0b1120] border border-white/5 p-4 rounded-2xl text-center">
                  <h3 className="text-primary text-3xl font-black mb-1">{formData.statsProjectsVal}+</h3>
                  <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black">{formData.statsProjectsLabel}</p>
                </div>
                <div className="bg-[#0b1120] border border-white/5 p-4 rounded-2xl text-center col-span-2">
                  <p className="text-slate-400 text-[10px] italic leading-tight">"{formData.statsQuote}"</p>
                </div>
              </div>

              {/* 3. FOOTER CANVAS PIECE */}
              <div className="border border-dashed border-slate-800/80 p-6 rounded-2xl relative bg-slate-950/20 space-y-4">
                <span className="absolute -top-3 left-4 bg-emerald-500 text-zinc-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">Footer Bindings</span>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 text-xs">
                  <div className="space-y-2 max-w-xs">
                    <p className="text-slate-400 leading-tight">{formData.footerBio}</p>
                    <div className="flex gap-2 text-slate-500 text-[10px]">
                      <span className="flex items-center gap-1"><Icon icon="tabler:mail" /> {formData.contactEmail}</span>
                      <span className="flex items-center gap-1"><Icon icon="tabler:phone" /> {formData.contactPhone}</span>
                    </div>
                  </div>
                  
                  {/* Social output mock */}
                  <div>
                    <p className="text-slate-500 text-[9px] uppercase tracking-wider mb-2 font-bold">Social Enpoints</p>
                    <div className="flex gap-2">
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-primary" title={formData.socialLinkedin}><Icon icon="fa6-brands:linkedin-in" /></span>
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white" title={formData.socialFacebook}><Icon icon="fa6-brands:facebook-f" /></span>
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white" title={formData.socialInstagram}><Icon icon="fa6-brands:instagram" /></span>
                      <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white" title={formData.socialTwitter}><Icon icon="fa6-brands:x-twitter" /></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="bg-[#0b0f1a] border border-slate-800 p-5 rounded-[2rem] text-slate-500 text-xs leading-relaxed flex gap-3 items-center">
            <Icon icon="tabler:bulb" className="text-yellow-500 text-2xl flex-shrink-0" />
            <p>
              <strong>Pro-Tip:</strong> The Right column mirrors the homepage layout structures dynamically. Modifying the fields on the Left side updates the mockup instantly, allowing you to preview titles and quotes in context before sending them to the cloud database.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
