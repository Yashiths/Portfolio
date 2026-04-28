"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const projectData = [
  { title: "E-commerce Platform", tech: ["React", "Firebase"], img: "images/projects/1.png" },
  { title: "Fitness Tracking App", tech: ["React Native"], img: "images/projects/2.png" },
  { title: "Personal Portfolio", tech: ["Next.js", "Framer"], img: "images/projects/3.png" },
  { title: "T24 Banking System", tech: ["Java", "Temenos"], img: "images/projects/4.png" },
  { title: "Furniture Web Store", tech: ["Next.js", "Firebase"], img: "images/projects/5.png" },
  { title: "Inventory System", tech: ["React.js", "MongoDB"], img: "images/projects/6.png" },
];

const ProjectCarousel = () => {
  return (
    <section className="py-24 bg-darkmode overflow-hidden" id="projects">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Latest <span className="text-primary">Projects</span>
        </h2>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-10">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"} 
          loop={true}
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
          {projectData.map((project, index) => (

            <SwiperSlide key={index} className="!w-[300px] md:!w-[380px]">
              <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-5 shadow-2xl transition-all duration-500 group hover:border-primary/20 backdrop-blur-sm">
                
                <div className="relative w-full h-52 mb-5 rounded-2xl overflow-hidden bg-black/30">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>

                <h3 className="text-white text-xl font-semibold mb-3 tracking-tight">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="bg-primary/5 text-primary text-[9px] px-2.5 py-1 rounded-full border border-primary/10 uppercase font-medium tracking-wider"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>

                <button className="w-full py-3.5 bg-primary text-black font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-primary/10">
                  Explore Project
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="swiper-button-prev !text-primary !left-2 after:!text-2xl after:!font-bold"></div>
        <div className="swiper-button-next !text-primary !right-2 after:!text-2xl after:!font-bold"></div>
        
        {/* Custom Pagination */}
        <div className="swiper-custom-pagination flex justify-center gap-2 mt-6"></div>
      </div>
    </section>
  );
};

export default ProjectCarousel;