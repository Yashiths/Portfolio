"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  // 1. Fetch messages from Firestore
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

  // 2. Mark message as read
  const handleRead = async (msg: any) => {
    setSelectedMsg(msg);
    if (msg.status === "unread") {
      await updateDoc(doc(db, "messages", msg.id), { status: "read" });
    }
  };

  // 3. Delete message
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteDoc(doc(db, "messages", id));
      setSelectedMsg(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Inbox</h1>
        <p className="text-emerald-500 font-medium">{messages.filter(m => m.status === "unread").length} New Messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        
        {/* Messages List */}
        <div className="lg:col-span-1 bg-[#0b0f1a] rounded-2xl border border-slate-800 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading messages...</div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  onClick={() => handleRead(msg)}
                  className={`p-5 cursor-pointer transition-all hover:bg-slate-800/30 ${selectedMsg?.id === msg.id ? 'bg-emerald-500/5 border-l-4 border-emerald-500' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm font-bold ${msg.status === "unread" ? "text-white" : "text-slate-400"}`}>{msg.name}</h4>
                    {msg.status === "unread" && <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Content View */}
        <div className="lg:col-span-2 bg-[#0b0f1a] rounded-2xl border border-slate-800 p-8 flex flex-col">
          {selectedMsg ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedMsg.subject}</h2>
                  <p className="text-emerald-500 text-sm mt-1">{selectedMsg.email}</p>
                  <p className="text-slate-500 text-xs mt-4 uppercase tracking-widest">Received: {selectedMsg.createdAt?.toDate().toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="bg-rose-500/10 text-rose-500 p-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Icon icon="tabler:trash" width="24" />
                </button>
              </div>
              <div className="bg-[#020617] p-6 rounded-2xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <Icon icon="tabler:mail-opened" width="60" className="opacity-10 mb-4" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}