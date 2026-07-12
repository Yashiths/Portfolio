"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface HeroData {
  heroGreeting?: string;
  heroTitle?: string;
  heroDescription?: string;
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    heroGreeting: "Hello, I am Yashith Sasmitha",
    heroTitle: "Full Stack Web Developer specializing in React",
    heroDescription: "I build modern, scalable web applications using React.js, Next.js, and Firebase. Focused on creating clean user interfaces and robust backend integrations."
  });

  // Listen to Firestore content in real-time
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(doc(db, "portfolio_content", "homepage"), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroData((prev) => ({
            ...prev,
            heroGreeting: data.heroGreeting || prev.heroGreeting,
            heroTitle: data.heroTitle || prev.heroTitle,
            heroDescription: data.heroDescription || prev.heroDescription,
          }));
        }
      }, (err) => {
        console.warn("Firestore Hero subscription error: ", err);
      });
      return () => unsub();
    } catch (e) {
      console.warn("Firestore error in Hero component: ", e);
    }
  }, []);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const floatingRightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      y: [0, -15, 0], 
    },
    transition: { 
      x: { duration: 0.6 },
      opacity: { duration: 0.6 },
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
  };

  return (
    <section className="relative md:pt-40 md:pb-28 py-20 overflow-hidden bg-white dark:bg-darkmode text-slate-900 dark:text-slate-200 transition-colors duration-300" id="main-banner">
      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading and Texts */}
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <div className="flex gap-3 items-center lg:justify-start justify-center mb-6 mt-12 lg:mt-0">
              <span className="text-3xl animate-bounce">👋</span>
              <p className="text-slate-700 dark:text-white sm:text-2xl text-lg mb-0 font-medium tracking-wide">
                {heroData.heroGreeting}
              </p>
            </div>
            
            <h1 className="font-bold lg:text-6xl md:text-5xl text-4xl lg:text-start text-center text-slate-950 dark:text-white mb-6 leading-tight tracking-tight">
              {heroData.heroTitle?.split(" ").map((word, i) => {
                const highlightWords = ["Full", "Stack", "Developer", "React", "Web"];
                const cleanedWord = word.replace(/[^a-zA-Z]/g, "");
                const isHighlight = highlightWords.includes(cleanedWord);
                return (
                  <span key={i} className={isHighlight ? "text-primary font-black" : ""}>
                    {word}{" "}
                  </span>
                );
              })}
            </h1>
            
            <p className="text-slate-600 dark:text-white/70 text-lg lg:text-start text-center mb-10 max-w-xl leading-relaxed">
              {heroData.heroDescription}
            </p>

            <div className="flex items-center lg:justify-start justify-center gap-6">
              <Link href="/projects" className="bg-primary border border-primary rounded-xl text-md font-bold uppercase italic hover:bg-transparent hover:text-primary text-black py-3.5 px-8 transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer">
                View My Work
              </Link>
              <a href="#contact" className="bg-transparent border border-slate-300 dark:border-primary rounded-xl text-md font-bold uppercase italic hover:bg-primary hover:text-black dark:text-primary text-slate-700 py-3.5 px-8 transition-all duration-300 cursor-pointer">
                Let's Talk
              </a>
            </div>
          </motion.div>
 
          {/* Right Column: Interactive Banner Image */}
          <motion.div
            {...floatingRightAnimation}
            className="lg:col-span-6 col-span-12 lg:block hidden"
          >
            <div className="ml-10 relative p-8">
              {/* Soft Pulsing Radial Glowing Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse duration-[8000ms]"></div>
              <div className="absolute top-1/4 left-1/4 w-[280px] h-[280px] bg-emerald-500/10 rounded-full blur-[80px] -z-10"></div>
              
              {/* Tech Grid Overlay Backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] border border-slate-200/50 dark:border-white/5 rounded-3xl -z-10 shadow-inner"></div>

              <Image
                src="/images/hero/banner-image.png"
                alt="Yashith Sasmitha - Portfolio"
                width={700}
                height={700}
                className="relative z-10 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-102"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <CardSlider />
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute w-96 h-96 bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full -top-32 -right-32 -z-1"></div>
      <div className="absolute w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/5 blur-[150px] rounded-full bottom-0 left-0 -z-1"></div>
    </section>
  );
};

export default Hero;