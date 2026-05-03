"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Icon } from "@iconify/react";

interface Project {
  id: string;
  title: string;
  client: string;
  status: string;
  startDate: string;
  targetDate: string;
  deliveryDate: string;
  actionPlan: string;
  price: string;
  github: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Filter State
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("startDate", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Project[];
      setProjects(data);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  // Filter Logic
  const filteredProjects = projects.filter(p => 
    activeFilter === "All" ? true : p.status === activeFilter
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `projects/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData({ ...formData, imageUrl: url });
    } catch (error) { alert("Image upload failed"); }
    setUploading(false);
  };

  const [formData, setFormData] = useState({
    title: "", client: "", status: "Ongoing", startDate: "", targetDate: "", deliveryDate: "", actionPlan: "", price: "", github: "", imageUrl: "", description: "", tagsString: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, tags: formData.tagsString.split(",").map(tag => tag.trim()) };
    delete (finalData as any).tagsString;
    try {
      if (editId) { await updateDoc(doc(db, "projects", editId), finalData); }
      else { await addDoc(collection(db, "projects"), finalData); }
      closeModal();
      fetchProjects();
    } catch (error) { alert("Error saving project"); }
  };

  const handleEdit = (project: Project) => {
    setEditId(project.id);
    setFormData({ ...project, tagsString: project.tags?.join(", ") || "" } as any);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ title: "", client: "", status: "Ongoing", startDate: "", targetDate: "", deliveryDate: "", actionPlan: "", price: "", github: "", imageUrl: "", description: "", tagsString: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-emerald-500">Project Control Center</h1>
          <p className="text-slate-400 text-sm mt-1">Showing {filteredProjects.length} {activeFilter === "All" ? "" : activeFilter} projects</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-emerald-500 text-zinc-950 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition hover:scale-105 active:scale-95">
          <Icon icon="tabler:plus" width="22" /> New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit">
        {["All", "Ongoing", "Completed", "Pending", "On Hold"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeFilter === status 
                ? "bg-emerald-500 text-zinc-950 shadow-lg" 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-[#0b0f1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1100px]">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-500 text-[11px] uppercase tracking-widest font-black">
              <tr>
                <th className="p-4">Project Details</th>
                <th className="p-4">Client</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timeline (S / T / D)</th>
                <th className="p-4">Action Plan</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {loading ? (
                <tr><td colSpan={7} className="p-20 text-center text-slate-500 animate-pulse">Syncing with Cloud DB...</td></tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/30 transition group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-emerald-400 transition">{project.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{project.tags?.join(" • ")}</div>
                    </td>
                    <td className="p-4 text-slate-400 font-medium">{project.client}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase border ${
                        project.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                        project.status === "Ongoing" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>{project.status}</span>
                    </td>
                    <td className="p-4 font-mono text-[10px] leading-relaxed">
                      <span className="text-slate-500 tracking-tighter italic">S: {project.startDate}</span> <br/> 
                      <span className="text-white font-bold tracking-tighter">T: {project.targetDate}</span> <br/>
                      {project.deliveryDate && <span className="text-emerald-500 font-bold tracking-tighter">D: {project.deliveryDate}</span>}
                    </td>
                    <td className="p-4 text-slate-400 italic max-w-[220px] truncate" title={project.actionPlan}>
                      <div className="flex items-center gap-1.5 uppercase text-[9px] font-bold text-slate-600 mb-1"><Icon icon="tabler:bolt" /> Next Step</div>
                      {project.actionPlan}
                    </td>
                    <td className="p-4 text-emerald-400 font-black font-mono">{project.price}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 text-slate-500">
                        <button onClick={() => handleEdit(project)} className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition"><Icon icon="tabler:edit" width="18" /></button>
                        <button onClick={() => { if(confirm("Delete Project?")) deleteDoc(doc(db, "projects", project.id)).then(fetchProjects) }} className="p-2 hover:bg-rose-500/10 rounded-lg hover:text-rose-500 transition"><Icon icon="tabler:trash" width="18" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="p-20 text-center text-slate-600 italic font-medium">No {activeFilter !== "All" ? activeFilter : ""} projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal remains the same as previous (keeping it hidden for brevity but it's in your code) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f1a] border border-slate-800 p-8 rounded-3xl w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Icon icon={editId ? "tabler:edit" : "tabler:plus"} className="text-emerald-500" /> {editId ? "Update Project Details" : "Register New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Project Name" required className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <input type="text" placeholder="GitHub Repository URL" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 transition" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-black uppercase ml-1">Start Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-black uppercase ml-1">Target Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.targetDate} onChange={(e) => setFormData({...formData, targetDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-emerald-500 font-black uppercase ml-1">Delivery Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <input type="file" className="text-[10px] text-slate-500" onChange={handleImageUpload} />
                  {uploading && <Icon icon="line-md:loading-twotone-loop" className="text-emerald-500" />}
                </div>
                <input type="text" placeholder="Tags (React, Node...)" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none" value={formData.tagsString} onChange={(e) => setFormData({...formData, tagsString: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="Client Name" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} />
                <select className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none font-bold" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                </select>
                <input type="text" placeholder="Budget / Price" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-emerald-400 font-mono font-bold outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
              <textarea placeholder="Brief Project Description" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white h-20 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              <textarea placeholder="Immediate Next Steps (Action Plan)" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white h-20 outline-none border-dashed" value={formData.actionPlan} onChange={(e) => setFormData({...formData, actionPlan: e.target.value})}></textarea>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 border border-slate-800 text-slate-500 font-bold p-4 rounded-2xl hover:bg-slate-900 transition">Discard</button>
                <button type="submit" disabled={uploading} className="flex-1 bg-emerald-500 text-zinc-950 font-black p-4 rounded-2xl hover:bg-emerald-400 transition disabled:opacity-50">
                  {editId ? "Update Project" : "Confirm & Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}