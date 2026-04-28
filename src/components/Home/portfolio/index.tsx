"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative py-20 overflow-hidden" id="about">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-primary text-20 font-medium mb-4">Get to know me</h4>
            <h2 className="text-white text-40 md:text-50 font-semibold leading-tight mb-6">
              Turning complex problems into <span className="text-primary">elegant solutions.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              I am a passionate Full-Stack Developer and Software Engineer with expertise in building high-performance web applications. 
              With a background in Temenos T24 core banking and modern frameworks like Next.js, I bridge the gap between robust backend logic and seamless frontend experiences.
            </p>
            
            <div className="flex flex-wrap gap-5">
              {/* Download CV Button */}
              <a 
                href="/path-to-your-cv.pdf" 
                download 
                className="bg-primary hover:bg-primary/80 text-black px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
              
              {/* Hire Me / Contact Button */}
              <a 
                href="#contact" 
                className="border border-white/20 hover:border-primary text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          {/* Right Side: Simple Stats or Image Placeholder */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-light_grey/10 p-8 rounded-3xl border border-white/5 text-center">
                <h3 className="text-primary text-40 font-bold mb-2">2+</h3>
                <p className="text-muted uppercase tracking-wider text-sm">Years Experience</p>
              </div>
              <div className="bg-light_grey/10 p-8 rounded-3xl border border-white/5 text-center">
                <h3 className="text-primary text-40 font-bold mb-2">15+</h3>
                <p className="text-muted uppercase tracking-wider text-sm">Projects Done</p>
              </div>
              <div className="bg-light_grey/10 p-8 rounded-3xl border border-white/5 text-center col-span-2">
                <p className="text-white text-lg italic">
                  "Driven by fitness and code, I believe in consistency and continuous improvement."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;