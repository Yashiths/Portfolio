"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgArray: any[] = [];
      querySnapshot.forEach((doc) => {
        msgArray.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRead = async (msg: any) => {
    setSelectedMsg(msg);
    if (msg.status === "unread") {
      await updateDoc(doc(db, "messages", msg.id), { status: "read" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteDoc(doc(db, "messages", id));
      setSelectedMsg(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* HEADER SECTION - Synced with Dashboard Style */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Inbox
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            {messages.filter(m => m.status === "unread").length} New Inbound Messages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh] px-2">
        
        {/* Messages List Sidebar */}
        <div className="lg:col-span-1 bg-[#0b0f1a] rounded-[2rem] border border-slate-800/50 overflow-hidden flex flex-col shadow-2xl">
          <div className="p-5 border-b border-slate-800/50 bg-slate-900/30">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message Stream</h3>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-slate-600 font-black uppercase text-xs animate-pulse">Syncing Inbox...</div>
            ) : (
              <div className="divide-y divide-slate-800/50">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    onClick={() => handleRead(msg)}
                    className={`p-6 cursor-pointer transition-all hover:bg-slate-800/30 relative ${
                      selectedMsg?.id === msg.id ? 'bg-emerald-500/5 border-l-4 border-emerald-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`text-sm font-black uppercase tracking-tight italic ${msg.status === "unread" ? "text-white" : "text-slate-500"}`}>
                        {msg.name}
                      </h4>
                      {msg.status === "unread" && <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>}
                    </div>
                    <p className={`text-[11px] truncate font-bold ${msg.status === "unread" ? "text-slate-300" : "text-slate-600"}`}>
                      {msg.subject}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Content View */}
        <div className="lg:col-span-2 bg-[#0b0f1a] rounded-[2.5rem] border border-slate-800/50 p-8 flex flex-col shadow-2xl relative overflow-hidden">
          {selectedMsg ? (
            <div className="animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8 border-b border-slate-800/50 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">
                    {selectedMsg.subject}
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <p className="text-emerald-500 text-[11px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                      {selectedMsg.email}
                    </p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Icon icon="tabler:calendar-event" /> {selectedMsg.createdAt?.toDate().toLocaleString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="bg-rose-500/10 text-rose-500 p-4 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                >
                  <Icon icon="tabler:trash" width="24" />
                </button>
              </div>
              
              <div className="flex-1 bg-[#020617] p-8 rounded-[2rem] border border-slate-800/50 text-slate-300 leading-relaxed whitespace-pre-wrap font-medium text-sm shadow-inner overflow-y-auto">
                {selectedMsg.message}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-4 border border-slate-800/50">
                <Icon icon="tabler:mail-opened" width="40" className="opacity-20" />
              </div>
              <p className="font-black uppercase tracking-[0.2em] text-[10px]">Select a transmission to decrypt</p>
            </div>
          )}

          {/* Decorative Background Icon */}
          <div className="absolute -bottom-10 -right-10 text-slate-800 opacity-5 pointer-events-none">
             <Icon icon="tabler:message-2-share" width="250" />
          </div>
        </div>

      </div>
    </div>
  );
}