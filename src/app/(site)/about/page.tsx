"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Layout/Header"; 
import Footer from "@/components/Layout/Footer";
import { GraduationCap, Award } from "lucide-react";
// Firebase imports
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AboutPage = () => {
  // States for dynamic data
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Real-time listener for profile data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "profile"), (doc) => {
      if (doc.exists()) {
        setProfile(doc.data());
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null; // Or a simple loader

  return (
    <main className="bg-darkmode min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed italic font-medium">
              {profile?.bio || "I am a passionate Software Engineer dedicated to building high-performance web applications."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Education Section - Dynamic Mapping */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={32} />
                <h2 className="text-white text-3xl font-bold">Education</h2>
              </div>
              
              <div className="space-y-8 border-l-2 border-white/5 ml-4 pl-8">
                {profile?.education?.map((edu: any, index: number) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full ${index === 0 ? 'bg-primary shadow-[0_0_10px_#00FF00]' : 'bg-white/20'}`}></div>
                    <h3 className="text-white text-xl font-bold uppercase italic tracking-tight">{edu.degree}</h3>
                    <p className="text-primary font-black mb-2 uppercase text-xs tracking-widest">{edu.institute}</p>
                    <p className="text-muted text-sm italic font-mono">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section - Dynamic Mapping */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={32} />
                <h2 className="text-white text-3xl font-bold">Certifications</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {profile?.certifications?.map((cert: any, index: number) => (
                  <div key={index} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-primary/20 transition-all group">
                    <h4 className="text-white font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-muted text-xs font-bold uppercase tracking-widest mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Goal Section */}
          <div className="mt-24 bg-[#0b1120] rounded-[40px] p-10 border border-white/5 relative overflow-hidden text-center">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
             <h3 className="text-white text-2xl font-black uppercase italic tracking-tighter mb-4">My Goal</h3>
             <p className="text-muted text-lg max-w-3xl mx-auto leading-relaxed font-medium italic">
               To bridge the gap between complex backend systems and intuitive user interfaces, creating seamless digital solutions that solve real-world problems.
             </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default AboutPage;