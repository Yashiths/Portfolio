"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Icon } from "@iconify/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Live Data States
  const [projectCount, setProjectCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);

  // Authentication logic
  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [user, loading, router]);

  // Real-time Database listeners
  useEffect(() => {
    if (!user) return;

    // Listen to ALL projects for stats & project count
    const unsubAll = onSnapshot(collection(db, "projects"), (snap) => {
      setProjectCount(snap.size); // Total Project Count එක මෙතනින් ගන්නවා
      
      let completed = 0, ongoing = 0, revenue = 0;
      snap.docs.forEach(doc => {
        const data = doc.data();
        revenue += (parseFloat(data.price?.replace(/[^\d.-]/g, '')) || 0);
        if (data.status === "Completed") completed++;
        else if (data.status === "Ongoing") ongoing++;
      });

      setTotalRevenue(revenue);
      setStatusData([
        { name: 'Completed', value: completed, color: '#10b981' },
        { name: 'Ongoing', value: ongoing, color: '#3b82f6' },
        { name: 'Pending', value: snap.size - (completed + ongoing), color: '#64748b' },
      ]);
    });

    // Latest Projects List
    const qLatest = query(collection(db, "projects"), orderBy("startDate", "desc"));
    const unsubLatest = onSnapshot(qLatest, (snap) => {
      setProjectsData(snap.docs.slice(0, 5).map(d => ({ id: d.id, ...d.data() })));
      
      // Sample Bar Chart Data (මේක ඔයාට පසුව මාසික ආදායම අනුව හදන්න පුළුවන්)
      const data = [
        { name: 'Jan', sales: 30 }, { name: 'Feb', sales: 45 },
        { name: 'Mar', sales: 28 }, { name: 'Apr', sales: 50 },
        { name: 'May', sales: 35 }, { name: 'Jun', sales: 40 }
      ];
      setBarData(data);
    });

    const unsubMessages = onSnapshot(collection(db, "messages"), (snap) => {
      setMessageCount(snap.size);
    });

    return () => {
      unsubAll();
      unsubLatest();
      unsubMessages();
    };
  }, [user]);

  if (loading) return <div className="p-10 text-emerald-500 animate-pulse font-black">SYNCING SYSTEMS...</div>;
  if (!user) return null;

  return (
    <div className="space-y-8 p-6 lg:p-10 text-white bg-[#020617] min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase italic">Overview</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            Real-time Performance Metrics
          </p>
        </div>
        <button 
          onClick={() => router.push('/admin/projects')}
          className="bg-white text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-emerald-500 transition-all shadow-xl shadow-white/5 active:scale-95"
        >
          <Icon icon="tabler:plus" width="22" /> NEW PROJECT
        </button>
      </div>

      {/* STATS GRID with Colorful Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Projects", value: projectCount, sub: "Live Records", icon: "tabler:box-model-2", color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Est. Revenue", value: `LKR ${totalRevenue.toLocaleString()}`, sub: "Gross Pipeline", icon: "tabler:currency-dollar", color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Inbound Leads", value: messageCount, sub: "Unread Messages", icon: "tabler:mail-opened", color: "text-rose-400", bg: "bg-rose-400/10" },
          { label: "System Health", value: "Online", sub: "Cloud Synced", icon: "tabler:shield-check", color: "text-amber-400", bg: "bg-amber-400/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0b0f1a] p-6 rounded-[2.5rem] border border-slate-800/50 relative overflow-hidden group hover:border-slate-700 transition-all shadow-2xl">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <Icon icon={stat.icon} width="24" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <p className="text-2xl font-black mt-1 italic">{stat.value}</p>
            <p className={`text-[10px] ${stat.color} mt-1 font-bold`}>{stat.sub}</p>
            
            {/* Soft Background Icon Decoration */}
            <div className={`absolute -right-4 -bottom-4 ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}>
              <Icon icon={stat.icon} width="100" />
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Performance matrix */}
        <div className="lg:col-span-2 bg-[#0b0f1a] p-8 rounded-[3rem] border border-slate-800/50 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black italic tracking-tighter uppercase">Performance Matrix</h3>
            <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold"><Icon icon="tabler:circle-filled" className="text-emerald-500"/> SALES</span>
               <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold"><Icon icon="tabler:circle-filled" className="text-blue-500"/> TARGETS</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 'bold'}}/>
                <YAxis hide />
                <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{backgroundColor: '#0b0f1a', borderRadius: '20px', border: '1px solid #ffffff10', fontSize: '12px'}}/>
                <Bar dataKey="sales" radius={[10, 10, 0, 0]} barSize={30}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Status (Pie) */}
        <div className="bg-[#0b0f1a] p-8 rounded-[3rem] border border-slate-800/50 flex flex-col justify-between shadow-2xl">
          <h3 className="text-lg font-black italic tracking-tighter text-center uppercase">Workload Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={65} outerRadius={85} paddingAngle={10} dataKey="value" stroke="none">
                  {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {statusData.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase">{item.name}</p>
                <p className="text-lg font-black text-white">{item.value}</p>
                 <div className="w-full h-1 mt-1 rounded-full" style={{ backgroundColor: item.color + '44' }}>
                    <div className="h-full rounded-full" style={{ backgroundColor: item.color, width: '100%' }}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    // LATEST PROJECTS LIST (Dashboard එකේ පහළ Table එක)
<div className="bg-[#0b0f1a] p-8 rounded-[2.5rem] border border-slate-800/50 shadow-2xl">
  <div className="flex justify-between items-center mb-8 px-2">
      <div>
        <h3 className="text-white font-black text-lg uppercase tracking-widest italic">Operational Stream</h3>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter mt-1">Focusing on active deployments</p>
      </div>
      <div className="flex items-center gap-2">
         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
         <span className="text-blue-500 text-[10px] font-black uppercase tracking-tighter">Ongoing Projects Only</span>
      </div>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full text-left min-w-[900px]">
      <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
        <tr>
          <th className="p-5">Project & Tags</th>
          <th className="p-5">Client</th>
          <th className="p-5">Status</th>
          <th className="p-5">Commitment</th>
          <th className="p-5">Price</th>
          <th className="p-5 text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 text-sm">
        {/* මෙතනදී අපි 'Ongoing' ඒවා විතරක් filter කරලා map කරනවා */}
        {projectsData.filter(p => p.status === "Ongoing").length === 0 ? (
          <tr><td colSpan={6} className="p-10 text-center text-slate-600 font-bold uppercase italic">No active projects in stream.</td></tr>
        ) : projectsData
            .filter(p => p.status === "Ongoing")
            .map((project) => (
          <tr key={project.id} className="hover:bg-slate-800/20 transition group">
            <td className="p-5">
              <div className="font-bold text-white group-hover:text-blue-400 transition">{project.title}</div>
              <div className="text-[9px] text-slate-500 mt-1 uppercase font-black tracking-widest">{project.tags?.join(" • ")}</div>
            </td>
            <td className="p-5 text-slate-400 font-bold">{project.client}</td>
            <td className="p-5">
              <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase border bg-blue-500/5 text-blue-400 border-blue-500/20">
                {project.status}
              </span>
            </td>
            <td className="p-5 font-mono text-[10px] leading-relaxed">
              <span className="text-slate-500">S: {project.startDate}</span> <br/> 
              <span className="text-white font-bold">T: {project.targetDate}</span>
            </td>
            <td className="p-4 text-emerald-400 font-black font-mono">{project.price}</td>
            <td className="p-5 text-right">
              <div className="flex justify-end gap-2 text-slate-500">
                <button onClick={() => router.push('/admin/projects')} className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition"><Icon icon="tabler:external-link" width="18" /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      
    </div>
  );
}