"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", amount: "", date: "", type: "Monthly" });

  useEffect(() => {
    const q = query(collection(db, "expenses"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount.toString()),
        updatedAt: new Date()
      };

      if (editId) {
        await updateDoc(doc(db, "expenses", editId), data);
      } else {
        await addDoc(collection(db, "expenses"), { ...data, createdAt: new Date() });
      }

      closeModal();
    } catch (err) { alert("Operation failed"); }
  };

  const handleEdit = (exp: any) => {
    setEditId(exp.id);
    setFormData({ name: exp.name, amount: exp.amount, date: exp.date, type: exp.type });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", amount: "", date: "", type: "Monthly" });
  };

  const getDaysLeft = (dateStr: string) => {
    const today = new Date();
    const payDate = new Date(dateStr);
    const diffTime = payDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Financial Terminal</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Audit and update operational expenditure</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 uppercase text-xs italic shadow-xl shadow-white/5"
        >
          <Icon icon="tabler:plus" width="20" /> New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0b0f1a] rounded-[2.5rem] border border-slate-800/50 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800/50 bg-slate-900/20 flex justify-between items-center">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Expense Registry</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="p-5">Service / Item</th>
                  <th className="p-5">Billing Date</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {expenses.map((exp) => {
                  const daysLeft = getDaysLeft(exp.date);
                  return (
                    <tr key={exp.id} className="hover:bg-slate-800/20 transition group">
                      <td className="p-5">
                        <div className="font-black text-white italic uppercase tracking-tight">{exp.name}</div>
                        <div className="text-[9px] text-slate-500 uppercase font-black">{exp.type}</div>
                      </td>
                      <td className="p-5">
                        <div className="text-white font-mono text-xs">{exp.date}</div>
                        <div className={`text-[9px] font-black uppercase ${daysLeft <= 3 ? "text-rose-500" : "text-slate-600"}`}>
                          {daysLeft > 0 ? `${daysLeft}d remaining` : "Overdue"}
                        </div>
                      </td>
                      <td className="p-5 text-emerald-400 font-black font-mono">LKR {exp.amount.toLocaleString()}</td>
                      <td className="p-5 text-right flex justify-end gap-2">
                        <button onClick={() => handleEdit(exp)} className="p-2 text-slate-500 hover:text-white transition">
                          <Icon icon="tabler:edit" width="18" />
                        </button>
                        <button onClick={() => { if(confirm("Delete entry?")) deleteDoc(doc(db, "expenses", exp.id)) }} className="p-2 text-slate-700 hover:text-rose-500 transition">
                          <Icon icon="tabler:trash" width="18" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0b0f1a] p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl relative overflow-hidden">
             <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Total Commitment</h3>
             <p className="text-4xl font-black text-white mt-2 italic tracking-tighter">
               LKR {expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
             </p>
             <Icon icon="tabler:chart-bar" width="120" className="absolute -right-8 -bottom-8 text-slate-800 opacity-10" />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f1a] border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-black text-white mb-6 uppercase italic tracking-tighter flex items-center gap-2">
               <Icon icon={editId ? "tabler:edit" : "tabler:plus"} className="text-emerald-500" /> {editId ? "Update Entry" : "New Expense"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Service Name" required 
                className="w-full bg-[#020617] border border-slate-800 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 transition font-bold"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="number" placeholder="Amount (LKR)" required 
                className="w-full bg-[#020617] border border-slate-800 p-4 rounded-2xl text-emerald-400 font-mono font-black outline-none focus:border-emerald-500 transition"
                value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-black uppercase ml-2 tracking-widest italic">Billing Date</label>
                <input 
                  type="date" required 
                  className="w-full bg-[#020617] border border-slate-800 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 transition"
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-white text-black font-black p-4 rounded-2xl hover:bg-emerald-400 transition uppercase tracking-widest text-xs italic">
                {editId ? "Update System Record" : "Confirm Entry"}
              </button>
              <button type="button" onClick={closeModal} className="w-full text-slate-600 font-black text-[10px] uppercase tracking-widest mt-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}