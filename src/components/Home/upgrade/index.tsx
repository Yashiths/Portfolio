"use client";
import React from "react";
import Link from "next/link";

const ServicesHighlight = () => {
  const services = [
    { title: "Web Development", desc: "React, Next.js & Node.js" },
    { title: "UI/UX Design", desc: "Modern & Clean Interfaces" },
    { title: "Mobile Apps", desc: "Native & Hybrid Solutions" },
    { title: "Graphic Design", desc: "Create your posts and logos" },
  ];

  return (
    <section className="py-20 bg-darkmode">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-[#0b1120] border border-white/5 rounded-[40px] p-8 md:p-16 shadow-2xl">
          
          {/* Background Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
                Ready to bring your <br />
                <span className="text-primary">ideas to life?</span>
              </h2>
              <p className="text-muted text-lg mb-8 opacity-80">
                I provide high-quality development services to help you build scalable products and better user experiences.
              </p>
              
              <Link href="#contact">
                <button className="px-10 py-4 bg-primary text-black font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
                  Hire Me Now
                </button>
              </Link>
            </div>

            {/* Right Content - Services Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-primary font-bold text-lg mb-1">{service.title}</h4>
                  <p className="text-white/60 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;