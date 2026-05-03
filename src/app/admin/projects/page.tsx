"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Icon } from "@iconify/react";

// 1. Interface updated with youtubeUrl
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
  youtubeUrl: string; // New Field
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
  const [activeFilter, setActiveFilter] = useState("All");

  // 2. Form Data updated with youtubeUrl
  const [formData, setFormData] = useState({
    title: "", client: "", status: "Ongoing", startDate: "", targetDate: "", 
    deliveryDate: "", actionPlan: "", price: "", github: "", 
    youtubeUrl: "", // New Field
    imageUrl: "", description: "", tagsString: ""
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { 
        ...formData, 
        tags: formData.tagsString.split(",").map(tag => tag.trim()) 
    };
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
    setFormData({ 
        ...project, 
        tagsString: project.tags?.join(", ") || "",
        youtubeUrl: project.youtubeUrl || "" 
    } as any);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ 
        title: "", client: "", status: "Ongoing", startDate: "", targetDate: "", 
        deliveryDate: "", actionPlan: "", price: "", github: "", 
        youtubeUrl: "", imageUrl: "", description: "", tagsString: "" 
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Project Control Center
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
             Monitoring {filteredProjects.length} {activeFilter === "All" ? "Total" : activeFilter} Projects
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase italic text-xs flex items-center gap-2 transition hover:bg-emerald-500 active:scale-95 shadow-lg shadow-white/5">
          <Icon icon="tabler:plus" width="22" /> New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit">
        {["All", "Ongoing", "Completed", "Pending", "On Hold"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
              activeFilter === status 
                ? "bg-emerald-500 text-zinc-950 shadow-lg" 
                : "text-slate-500 hover:text-white hover:bg-slate-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-[#0b0f1a] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1100px]">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <tr>
                <th className="p-5">Project Details</th>
                <th className="p-5">Client</th>
                <th className="p-5">Status</th>
                <th className="p-5">Timeline (S / T / D)</th>
                <th className="p-5">Action Plan</th>
                <th className="p-5">Price</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {loading ? (
                <tr><td colSpan={7} className="p-20 text-center text-slate-500 font-black uppercase tracking-widest animate-pulse italic">Syncing with Cloud DB...</td></tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/30 transition group">
                    <td className="p-5">
                      <div className="font-black text-white group-hover:text-emerald-400 transition italic uppercase tracking-tight">{project.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 font-black uppercase tracking-tighter">{project.tags?.join(" • ")}</div>
                    </td>
                    <td className="p-5 text-slate-400 font-bold uppercase text-[12px]">{project.client}</td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase border ${
                        project.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                        project.status === "Ongoing" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>{project.status}</span>
                    </td>
                    <td className="p-5 font-mono text-[10px] leading-relaxed">
                      <span className="text-slate-500 italic">S: {project.startDate}</span> <br/> 
                      <span className="text-white font-bold">T: {project.targetDate}</span> <br/>
                      {project.deliveryDate && <span className="text-emerald-500 font-bold">D: {project.deliveryDate}</span>}
                    </td>
                    <td className="p-5 text-slate-400 italic max-w-[220px] truncate" title={project.actionPlan}>
                      <div className="flex items-center gap-1.5 uppercase text-[9px] font-black text-slate-600 mb-1 tracking-widest"><Icon icon="tabler:bolt" /> Next Step</div>
                      {project.actionPlan}
                    </td>
                    <td className="p-5 text-emerald-400 font-black font-mono">{project.price}</td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2 text-slate-500">
                        {/* YouTube Link Icon */}
                        {project.youtubeUrl && (
                          <a href={project.youtubeUrl} target="_blank" className="p-2 hover:bg-slate-800 rounded-lg hover:text-red-500 transition">
                            <Icon icon="tabler:brand-youtube" width="18" />
                          </a>
                        )}
                        <button onClick={() => handleEdit(project)} className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition"><Icon icon="tabler:edit" width="18" /></button>
                        <button onClick={() => { if(confirm("Delete Project?")) deleteDoc(doc(db, "projects", project.id)).then(fetchProjects) }} className="p-2 hover:bg-rose-500/10 rounded-lg hover:text-rose-500 transition"><Icon icon="tabler:trash" width="18" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="p-20 text-center text-slate-600 font-black uppercase italic tracking-widest">No {activeFilter !== "All" ? activeFilter : ""} projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f1a] border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 uppercase italic tracking-tighter">
               <Icon icon={editId ? "tabler:edit" : "tabler:plus"} className="text-emerald-500" /> {editId ? "Update Project Details" : "Register New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Project Name" required className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 transition font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                
                {/* 3. YouTube URL Field added here */}
                <input type="text" placeholder="YouTube Demo URL (Optional)" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-red-500 transition font-bold" value={formData.youtubeUrl} onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="GitHub Repository URL" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none focus:border-emerald-500 transition font-bold" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} />
                <input type="text" placeholder="Tags (React, Node...)" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none font-bold" value={formData.tagsString} onChange={(e) => setFormData({...formData, tagsString: e.target.value})} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-black uppercase ml-1 tracking-widest">Start Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-black uppercase ml-1 tracking-widest">Target Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.targetDate} onChange={(e) => setFormData({...formData, targetDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-emerald-500 font-black uppercase ml-1 tracking-widest">Delivery Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <input type="file" className="text-[10px] text-slate-500 font-bold" onChange={handleImageUpload} />
                  {uploading && <Icon icon="line-md:loading-twotone-loop" className="text-emerald-500" />}
                </div>
                <input type="text" placeholder="Client Name" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none font-bold" value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-white outline-none font-black uppercase text-[12px]" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                </select>
                <input type="text" placeholder="Budget / Price" className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-emerald-400 font-mono font-black outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>

              <textarea placeholder="Brief Project Description" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white h-20 outline-none font-medium" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              <textarea placeholder="Immediate Next Steps (Action Plan)" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white h-20 outline-none border-dashed font-medium" value={formData.actionPlan} onChange={(e) => setFormData({...formData, actionPlan: e.target.value})}></textarea>
              
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 border border-slate-800 text-slate-500 font-black uppercase p-4 rounded-2xl hover:bg-slate-900 transition tracking-widest text-xs">Discard</button>
                <button type="submit" disabled={uploading} className="flex-1 bg-white text-black font-black uppercase p-4 rounded-2xl hover:bg-emerald-400 transition disabled:opacity-50 tracking-widest text-xs italic">
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