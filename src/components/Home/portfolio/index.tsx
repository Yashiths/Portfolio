"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";// Icons පාවිච්චියට

// Firebase imports
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProjectCarousel = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const q = query(
      collection(db, "projects"),
      where("status", "==", "Completed")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allProjects: any[] = [];
      querySnapshot.forEach((doc) => {
        allProjects.push({ id: doc.id, ...doc.data() });
      });

      
      const filtered = allProjects
        .filter(p => p.isFeatured === true)
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        .slice(0, 6);

      setProjects(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || projects.length === 0) return null;

  return (
    <section className="py-24 bg-darkmode overflow-hidden" id="projects">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Featured <span className="text-primary">Showcase</span>
        </h2>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-10">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"} 
          loop={projects.length > 3}
          coverflowEffect={{
            rotate: 30, 
            stretch: 0, 
            depth: 150, 
            modifier: 1.5,
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
              <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-5 shadow-2xl transition-all duration-500 group hover:border-primary/20 backdrop-blur-sm h-full flex flex-col">
                
                <div className="relative w-full h-52 mb-5 rounded-2xl overflow-hidden bg-black/30 group/img">
                  <Image
                    src={project.imageUrl || "/images/projects/placeholder.png"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-110 group-hover/img:blur-[2px]"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />

                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20">
                    <a 
                      href={project.github || "#"} 
                      target="_blank" 
                      className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
                    >
                      <Icon icon="tabler:brand-github" width="16" /> GitHub
                    </a>
                    
                    {project.youtubeUrl && (
                      <a 
                        href={project.youtubeUrl} 
                        target="_blank" 
                        className="flex items-center gap-2 bg-[#ff0000] text-white px-6 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
                      >
                        <Icon icon="tabler:brand-youtube" width="16" /> Demo
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-white text-xl font-semibold mb-3 tracking-tight">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags && project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-primary/5 text-primary text-[9px] px-2.5 py-1 rounded-full border border-primary/10 uppercase font-medium tracking-wider"
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
      </div>
    </section>
  );
};

export default ProjectCarousel;