"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Icon } from "@iconify/react";

const allProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Full Stack",
    image: "/images/projects/ecommerce.jpg", // මෙතන path එක ඔයාගේ folder එක අනුව බලන්න
    tags: ["React", "Firebase"],
  },
  {
    id: 2,
    title: "Inventory Management System",
    category: "Management",
    image: "/images/projects/inventory.jpg",
    tags: ["React.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    category: "Mobile App",
    image: "/images/projects/fitness.jpg",
    tags: ["React Native"],
  },
  {
    id: 4,
    title: "Personal Portfolio",
    category: "Web Design",
    image: "/images/projects/portfolio.jpg",
    tags: ["Next.js", "Tailwind"],
  },
  {
    id: 5,
    title: "Restaurant Web App",
    category: "Full Stack",
    image: "/images/projects/restaurant.jpg",
    tags: ["Node.js", "React"],
  },
  {
    id: 6,
    title: "Furniture Web Store",
    category: "Web Design",
    image: "/images/projects/furniture.jpg",
    tags: ["Next.js"],
  },
  {
    id: 7,
    title: "Graphic Design Portfolio",
    category: "Design",
    image: "/images/projects/graphic.jpg",
    tags: ["Adobe", "Photoshop"],
  },
];

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  return (
    <main className="bg-darkmode min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Explore my latest works, ranging from web applications to creative designs.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <div key={project.id} className="group bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                   <button className="bg-primary text-darkmode px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                     View Project
                   </button>
                </div>
                {/* Image placeholder - ඔයාගේ images ටික public folder එකට දාලා path එක හදන්න */}
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-muted">
                                  </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-white/10 text-white px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-primary hover:text-darkmode disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <Icon icon="tabler:chevron-left" width="24" />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition-all ${
                    currentPage === i + 1 ? "bg-primary text-darkmode" : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-primary hover:text-darkmode disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <Icon icon="tabler:chevron-right" width="24" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProjectsPage;