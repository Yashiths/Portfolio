"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface StatsData {
  statsYearsVal?: number;
  statsYearsLabel?: string;
  statsProjectsVal?: number;
  statsProjectsLabel?: string;
  statsQuote?: string;
}

function runCountAnimation(
  from: number,
  to: number,
  options: { duration: number; onUpdate: (v: number) => void }
) {
  let startTimestamp: number | null = null;
  let rAFId: number;

  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / (options.duration * 1000), 1);

    // Ease out quad
    const val = from + (to - from) * (progress * (2 - progress));
    options.onUpdate(val);

    if (progress < 1) {
      rAFId = window.requestAnimationFrame(step);
    }
  };

  rAFId = window.requestAnimationFrame(step);
  return {
    stop: () => window.cancelAnimationFrame(rAFId),
  };
}

// Reusable Scroll-triggered CountUp Component using Framer Motion
const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = runCountAnimation(0, value, {
        duration: 2.0,
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const AboutSection = () => {
  const [stats, setStats] = useState<StatsData>({
    statsYearsVal: 2,
    statsYearsLabel: "Years Experience",
    statsProjectsVal: 15,
    statsProjectsLabel: "Projects Done",
    statsQuote: "Driven by fitness and code, I believe in consistency and continuous improvement."
  });

  // Listen to stats content in real-time
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(doc(db, "portfolio_content", "homepage"), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats((prev) => ({
            ...prev,
            statsYearsVal: Number(data.statsYearsVal) || prev.statsYearsVal,
            statsYearsLabel: data.statsYearsLabel || prev.statsYearsLabel,
            statsProjectsVal: Number(data.statsProjectsVal) || prev.statsProjectsVal,
            statsProjectsLabel: data.statsProjectsLabel || prev.statsProjectsLabel,
            statsQuote: data.statsQuote || prev.statsQuote,
          }));
        }
      }, (err) => {
        console.warn("Firestore stats subscription error: ", err);
      });
      return () => unsub();
    } catch (e) {
      console.warn("Firestore stats error: ", e);
    }
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-darkmode text-slate-900 dark:text-slate-200 transition-colors duration-300 border-t border-slate-200 dark:border-white/5" id="about">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-emerald-600 dark:text-emerald-400 text-sm font-black uppercase tracking-[0.2em] mb-4">Get to know me</h4>
            <h2 className="text-slate-950 dark:text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
              Turning complex problems into <span className="text-emerald-600 dark:text-emerald-400">elegant solutions.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              I am a passionate Full-Stack Developer and Software Engineer with expertise in building high-performance web applications. 
              With a background in Temenos T24 core banking integrations and modern frameworks like Next.js, I bridge the gap between robust backend systems and seamless frontend interfaces.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* Download CV Button */}
              <a 
                href="/path-to-your-cv.pdf" 
                download 
                className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-950 px-8 py-4 rounded-xl font-bold uppercase italic text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
              
              {/* Hire Me / Contact Button */}
              <a 
                href="#contact" 
                className="border border-slate-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-white px-8 py-4 rounded-xl font-bold uppercase italic text-xs tracking-wider transition-all duration-300 flex items-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          {/* Right Side: Animated Stats and Personal Quote */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 relative">
              {/* Soft glow underlying card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -z-10"></div>

              {/* Counter Card 1 */}
              <div className="bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800 dark:shadow-none p-8 rounded-3xl text-center transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-emerald-600 dark:text-emerald-400 text-5xl font-black mb-2 select-none tracking-tight">
                  <CountUp value={stats.statsYearsVal || 2} suffix="+" />
                </h3>
                <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  {stats.statsYearsLabel}
                </p>
              </div>

              {/* Counter Card 2 */}
              <div className="bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800 dark:shadow-none p-8 rounded-3xl text-center transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-emerald-600 dark:text-emerald-400 text-5xl font-black mb-2 select-none tracking-tight">
                  <CountUp value={stats.statsProjectsVal || 15} suffix="+" />
                </h3>
                <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  {stats.statsProjectsLabel}
                </p>
              </div>

              {/* Quote Card */}
              <div className="bg-white border border-zinc-100 shadow-sm dark:bg-zinc-900/50 dark:border-zinc-800 dark:shadow-none p-8 rounded-3xl text-center col-span-2 transition-colors">
                <p className="text-slate-700 dark:text-slate-300 text-md italic font-semibold leading-relaxed mb-0">
                  "{stats.statsQuote}"
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