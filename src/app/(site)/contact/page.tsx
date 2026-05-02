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
      // Save contact message to Firestore
      await addDoc(collection(db, "messages"), {
        ...formData,
        status: "unread", // To track unread messages in Admin Panel
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
    <main className="bg-[#020617] min-h-screen text-slate-200">
      <Header />
      
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-700">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
              Get In <span className="text-emerald-500">Touch</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Have a project in mind or just want to say hi? Feel free to drop a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: "tabler:mail", label: "Email Me", val: "yashith@example.com", color: "text-emerald-500" },
                { icon: "tabler:brand-whatsapp", label: "WhatsApp", val: "+94 7X XXX XXXX", color: "text-green-500" },
                { icon: "tabler:map-pin", label: "Location", val: "Colombo, Sri Lanka", color: "text-blue-500" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0b0f1a] p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                  <div className={`${item.color} bg-white/5 p-3 rounded-xl`}>
                    <Icon icon={item.icon} width="28" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">{item.label}</p>
                    <p className="text-white font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#0b0f1a] p-8 rounded-3xl border border-slate-800 shadow-2xl">
                {success ? (
                  <div className="py-10 text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon icon="tabler:check" width="40" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-slate-400 mt-2">Thanks for reaching out. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition"
                    />
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#020617] border border-slate-800 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition resize-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition active:scale-[0.98] disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
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


