"use client";
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Icon } from "@iconify/react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        status: "unread",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="bg-[#0D1117] min-h-screen text-slate-300 font-sans selection:bg-emerald-500/30">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* GitHub Style Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start max-w-7xl mx-auto">
            
            {/* Left Side: Content (GitHub Style) */}
            <div className="lg:w-1/2 space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div>
                <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                  Let’s build the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    future together.
                  </span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg">
                  Whether you have a question or just want to say hi, my inbox is always open. 
                  I’ll try my best to get back to you!
                </p>
              </div>

              {/* Minimalist Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                <div className="group border border-slate-800 bg-[#161B22]/50 p-5 rounded-2xl hover:border-emerald-500/50 transition-all duration-300">
                  <Icon icon="tabler:mail" className="text-emerald-400 mb-3" width="24" />
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email</p>
                  <p className="text-white font-medium truncate">yashith@example.com</p>
                </div>
                <div className="group border border-slate-800 bg-[#161B22]/50 p-5 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
                  <Icon icon="tabler:brand-whatsapp" className="text-blue-400 mb-3" width="24" />
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Chat</p>
                  <p className="text-white font-medium">+94 7X XXX XXXX</p>
                </div>
              </div>
            </div>

            {/* Right Side: Form (Modern GitHub Login Style) */}
            <div className="lg:w-1/2 w-full animate-in fade-in slide-in-from-right duration-700">
              <div className="bg-[#161B22] border border-[#30363D] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                
                {success ? (
                  <div className="py-20 text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon icon="tabler:circle-check" width="48" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                    <p className="text-slate-400">Your message has been delivered to my inbox.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or idea..."
                        className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#238636] hover:bg-[#2EA043] disabled:bg-[#238636]/50 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Icon icon="tabler:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-[2px]">
                      Encrypted and secured connection
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;