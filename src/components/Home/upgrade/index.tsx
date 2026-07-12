"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
}

const ServiceCard = ({ title, desc, icon }: ServiceItem) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="relative overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-inner hover:scale-[1.02] active:scale-[0.99] group cursor-default"
    >
      {/* Dynamic Glowing Spotlight Backdrop */}
      {isFocused && (
        <div
          className="absolute pointer-events-none -inset-px rounded-[2rem] opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(153, 227, 158, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Dynamic Border Spotlight */}
      {isFocused && (
        <div
          className="absolute pointer-events-none -inset-px rounded-[2rem] opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(153, 227, 158, 0.4), transparent 80%)`,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Card Icon */}
      <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
        <Icon icon={icon} width="20" height="20" />
      </div>

      <h4 className="text-slate-900 dark:text-primary font-bold text-xl mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
        {title}
      </h4>
      
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

const ServicesHighlight = () => {
  const services: ServiceItem[] = [
    { title: "Web Development", desc: "High performance, fully custom applications using React, Next.js, and Node.js.", icon: "tabler:code" },
    { title: "UI/UX Design", desc: "User-centric, clean design patterns and immersive layout structures.", icon: "tabler:palette" },
    { title: "Mobile Apps", desc: "Scalable cross-platform and native solutions mapping banking systems.", icon: "tabler:device-mobile" },
    { title: "Graphic Design", desc: "Pixel-perfect visual identities, logos, and custom marketing content.", icon: "tabler:vector" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-darkmode text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-white/5 rounded-[40px] p-8 md:p-16 shadow-lg dark:shadow-2xl">
          
          {/* Background Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-slate-950 dark:text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
                Ready to bring your <br />
                <span className="text-primary">ideas to life?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                I provide high-quality development and consulting services to build scalable products and exceptional user experiences.
              </p>
              
              <Link href="#contact" className="inline-block">
                <button className="px-10 py-4 bg-primary text-black font-black uppercase italic text-xs tracking-wider rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer">
                  Hire Me Now
                </button>
              </Link>
            </div>

            {/* Right Content - Services Spotlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto flex-1 max-w-2xl">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  title={service.title} 
                  desc={service.desc}
                  icon={service.icon}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;