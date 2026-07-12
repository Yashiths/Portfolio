"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";

// Firebase imports
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Realistic project fallbacks if db has no projects
const fallbackProjects = [
  {
    id: "fallback-1",
    title: "Temenos T24 Custom Integration Middleware",
    description: "Secure, high-throughput integration middleware linking T24 core banking tables with dynamic API portals.",
    tags: ["Temenos T24", "Node.js", "Express", "Docker"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  },
  {
    id: "fallback-2",
    title: "Next.js Glassmorphic Developer Portfolio",
    description: "A fast, SEO-optimized personal website featuring real-time custom CMS and interactive animations.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Firebase"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  },
  {
    id: "fallback-3",
    title: "Distributed E-Commerce Microservices",
    description: "An isolated distributed system backend powered by NestJS messaging queues and database partitions.",
    tags: ["NestJS", "PostgreSQL", "RabbitMQ", "TypeScript"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  },
  {
    id: "fallback-4",
    title: "Real-time Collaboration Engine",
    description: "Collaborative platform featuring channel streams, private sockets, and automated cloud back-ups.",
    tags: ["React", "Firebase Auth", "Firestore", "Tailwind"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  },
  {
    id: "fallback-5",
    title: "Container Automated Deployer",
    description: "A developer CLI tool that reads Webhooks and triggers containerized deployments on branch changes.",
    tags: ["Go", "Docker", "Webhooks", "GitHub API"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  },
  {
    id: "fallback-6",
    title: "Temenos T24 Schema Compiler",
    description: "A parsing tool that compiles complex banking tables and formats fields into lightweight JSON structures.",
    tags: ["Python", "Parsing", "T24", "JSON"],
    imageUrl: "/images/projects/placeholder.png",
    github: "https://github.com",
    youtubeUrl: "",
    status: "Completed",
    isFeatured: true,
  }
];

const ProjectCarousel = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      // Fallback immediately if db is not initialized
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "projects"),
        where("status", "==", "Completed")
      );
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const allProjects: any[] = [];
        querySnapshot.forEach((doc) => {
          allProjects.push({ id: doc.id, ...doc.data() });
        });

        // Filter and sort database projects
        const dbFeatured = allProjects
          .filter(p => p.isFeatured === true)
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        // Merge database projects with fallbacks to guarantee EXACTLY 6 projects
        let mergedProjects = [...dbFeatured];
        if (mergedProjects.length < 6) {
          const needed = 6 - mergedProjects.length;
          const filler = fallbackProjects.filter(
            fp => !mergedProjects.some(mp => mp.title === fp.title)
          ).slice(0, needed);
          mergedProjects = [...mergedProjects, ...filler];
        }

        // Limit exactly to 6
        setProjects(mergedProjects.slice(0, 6));
        setLoading(false);
      }, (error) => {
        console.warn("Firestore projects stream error (using static fallback): ", error);
        setProjects(fallbackProjects);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Firestore error in ProjectCarousel init: ", e);
      setProjects(fallbackProjects);
      setLoading(false);
    }
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-darkmode text-slate-900 dark:text-slate-200 transition-colors duration-300 overflow-hidden" id="projects">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-slate-950 dark:text-white text-4xl md:text-5xl font-bold leading-tight">
          Featured <span className="text-primary">Showcase</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 max-w-md mx-auto">
          Explore my core engineering projects.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative w-full max-w-[1400px] mx-auto px-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"} 
            loop={projects.length > 3}
            coverflowEffect={{
              rotate: 20, 
              stretch: 0, 
              depth: 120, 
              modifier: 1.2,
              slideShadows: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-custom-pagination",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper py-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="!w-[300px] md:!w-[380px]">
                <div className="bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-white/5 rounded-3xl p-5 shadow-lg dark:shadow-2xl transition-all duration-500 group hover:border-primary/30 backdrop-blur-sm h-full flex flex-col">
                  
                  <div className="relative w-full h-52 mb-5 rounded-2xl overflow-hidden bg-slate-200 dark:bg-black/30 group/img">
                    <Image
                      src={project.imageUrl || "/images/projects/placeholder.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/img:scale-110 group-hover/img:blur-[2px]"
                      sizes="(max-width: 768px) 100vw, 380px"
                    />

                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
                        >
                          <Icon icon="tabler:brand-github" width="16" /> GitHub
                        </a>
                      )}
                      
                      {project.youtubeUrl && (
                        <a 
                          href={project.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#ff0000] text-white px-6 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
                        >
                          <Icon icon="tabler:brand-youtube" width="16" /> Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-slate-900 dark:text-white text-lg font-semibold mb-3 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 flex-1 line-clamp-3">
                    {project.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags && project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-emerald-600 dark:text-primary text-[9px] px-2.5 py-1 rounded-full border border-primary/20 uppercase font-bold tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev !text-primary !left-2 after:!text-2xl after:!font-bold"></div>
          <div className="swiper-button-next !text-primary !right-2 after:!text-2xl after:!font-bold"></div>
          
          <div className="swiper-custom-pagination flex justify-center gap-2 mt-6"></div>
          
          {/* Centered Route Link to Standalone /projects */}
          <div className="flex justify-center mt-12 animate-in fade-in duration-500">
            <Link href="/projects" className="group flex items-center gap-2 bg-primary hover:bg-primary/80 text-black px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-wider transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer hover:scale-105 active:scale-95">
              Show More Projects
              <Icon icon="tabler:arrow-right" className="group-hover:translate-x-1 transition-transform" width="16" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectCarousel;