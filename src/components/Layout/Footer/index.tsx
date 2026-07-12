"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { Icon } from "@iconify/react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from "firebase/firestore";

interface CMSContent {
  footerBio?: string;
  socialLinkedin?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialTwitter?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const Footer: FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // CMS Content State with fallback defaults
  const [cmsData, setCmsData] = useState<CMSContent>({
    footerBio: "Building modern web applications with a focus on performance and exceptional user experiences.",
    socialLinkedin: "https://linkedin.com/in/yashith-sasmitha",
    socialFacebook: "#",
    socialInstagram: "#",
    socialTwitter: "#",
    contactEmail: "yashith@example.com",
    contactPhone: "+94 7X XXX XXXX",
  });

  // Fetch CMS data in real-time
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(doc(db, "portfolio_content", "homepage"), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as CMSContent;
          setCmsData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      }, (error) => {
        console.warn("Firestore Footer CMS subscription error: ", error);
      });
      return () => unsub();
    } catch (e) {
      console.warn("Firestore is not initialized or accessible in Footer: ", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "messages"), {
          name: formData.name,
          email: formData.email,
          subject: "Contact Form Submission (Footer)",
          message: formData.message,
          status: "unread",
          createdAt: serverTimestamp(),
        });
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error("Database not connected");
      }
    } catch (error) {
      console.error("Error sending message from footer contact form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-slate-50 dark:bg-darkmode border-t border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-200 transition-colors duration-300" id="contact">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand & Info Column (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-darkmode w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl">
                YS
              </div>
              <span className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">
                Yashith<span className="text-primary">.</span>
              </span>
            </Link>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              {cmsData.footerBio}
            </p>

            {/* Micro contact cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Icon icon="tabler:mail" className="text-primary w-5 h-5" />
                <span>{cmsData.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Icon icon="tabler:brand-whatsapp" className="text-primary w-5 h-5" />
                <span>{cmsData.contactPhone}</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 items-center pt-4">
              {cmsData.socialLinkedin && (
                <a href={cmsData.socialLinkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary hover:text-black transition-all group" title="LinkedIn">
                  <Icon icon="fa6-brands:linkedin-in" width="18" height="18" className="text-slate-700 dark:text-white group-hover:text-black transition-all" />
                </a>
              )}
              {cmsData.socialFacebook && (
                <a href={cmsData.socialFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary hover:text-black transition-all group" title="Facebook">
                  <Icon icon="fa6-brands:facebook-f" width="16" height="16" className="text-slate-700 dark:text-white group-hover:text-black transition-all" />
                </a>
              )}
              {cmsData.socialInstagram && (
                <a href={cmsData.socialInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary hover:text-black transition-all group" title="Instagram">
                  <Icon icon="fa6-brands:instagram" width="18" height="18" className="text-slate-700 dark:text-white group-hover:text-black transition-all" />
                </a>
              )}
              {cmsData.socialTwitter && (
                <a href={cmsData.socialTwitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary hover:text-black transition-all group" title="Twitter/X">
                  <Icon icon="fa6-brands:x-twitter" width="16" height="16" className="text-slate-700 dark:text-white group-hover:text-black transition-all" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column (Center) */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 dark:text-white mb-6 font-semibold text-lg uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {headerData.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href || "#"}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all text-sm flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form Column (Right) */}
          <div className="lg:col-span-5 bg-slate-100 dark:bg-[#0b1120] border border-slate-200 dark:border-white/5 p-8 rounded-3xl shadow-xl transition-all duration-300">
            <h4 className="text-slate-900 dark:text-white text-xl font-bold mb-2">Send a Message</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs mb-6">Got an idea or want to collaborate? Get in touch!</p>
            
            {success ? (
              <div className="py-8 text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="tabler:circle-check" width="36" />
                </div>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Message Received!</h5>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-white dark:bg-darkmode border border-slate-200 dark:border-[#30363D] rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white dark:bg-darkmode border border-slate-200 dark:border-[#30363D] rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white dark:bg-darkmode border border-slate-200 dark:border-[#30363D] rounded-xl p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-black font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group text-sm cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Icon icon="tabler:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-slate-500 dark:text-slate-400">
          <h5 className="font-medium">
            &copy; 2026 | <span className="text-slate-700 dark:text-white">{cmsData.contactEmail === "yashith@example.com" ? "Yashith Sasmitha" : "Developer"}</span>
          </h5>
          <h5 className="font-medium">
            Handcrafted with precision &amp; code
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;