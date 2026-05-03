"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Icon } from "@iconify/react";
// Firestore imports
import { db } from "@/lib/firebase"; 
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]); // Data store කරන්න state එකක්
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // 1. Firestore එකෙන් Data Fetch කිරීම
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsArray: any[] = [];
      querySnapshot.forEach((doc) => {
        projectsArray.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Pagination Logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <main className="bg-[#020617] min-h-screen text-slate-200">
      <Header />
      
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            My <span className="text-emerald-500">Projects</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore my latest works, ranging from web applications to creative designs, all managed via my custom dashboard.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <div key={project.id} className="group bg-[#0b0f1a] rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 shadow-xl">
                  <div className="relative h-60 w-full overflow-hidden">
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                       <Link href={project.github || "#"} target="_blank" className="bg-emerald-500 text-zinc-950 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                         View Project
                       </Link>
                    </div>
                    
                    {/* Project Image */}
                    <Image 
                      src={project.imageUrl || "/images/placeholder.jpg"} 
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                        <p className="text-slate-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {project.tags && project.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls (Same as before) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-800 text-white hover:bg-emerald-500 hover:text-zinc-950 disabled:opacity-30 transition-all"
                >
                  <Icon icon="tabler:chevron-left" width="24" />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === i + 1 ? "bg-emerald-500 text-zinc-950" : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-800 text-white hover:bg-emerald-500 hover:text-zinc-950 disabled:opacity-30 transition-all"
                >
                  <Icon icon="tabler:chevron-right" width="24" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

    </main>
  );
};

export default ProjectsPage;