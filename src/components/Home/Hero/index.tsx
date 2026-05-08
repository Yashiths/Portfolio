"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CardSlider from "./slider";
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12 items-center">
          <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
            <div className="flex gap-4 items-center lg:justify-start justify-center mb-6 mt-24">
              <span className="text-4xl animate-bounce">👋</span>
              <p className="text-white sm:text-28 text-18 mb-0 font-medium tracking-wide">
                Hello, I am <span className="text-primary">Yashith Sasmitha</span>
              </p>
            </div>
            
            <h1 className="font-bold lg:text-72 md:text-60 text-48 lg:text-start text-center text-white mb-8 leading-tight">
              Full Stack <span className="text-primary">Web Developer</span> specializing in <span className="text-primary">React</span>
            </h1>
            
            <p className="text-white text-opacity-70 text-lg lg:text-start text-center mb-10 max-w-xl leading-relaxed">
              I build modern, scalable web applications using React.js, Next.js, and Firebase. 
              Focused on creating clean user interfaces and robust backend integrations.
            </p>

            <div className="flex items-center md:justify-start justify-center gap-6">
              <Link
                href="/projects"
                className="bg-primary border border-primary rounded-lg text-18 font-semibold hover:bg-transparent hover:text-primary text-darkmode py-3 px-8 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-primary rounded-lg text-18 font-semibold hover:bg-primary hover:text-darkmode text-primary py-3 px-8 transition-all duration-300"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...rightAnimation}
            className="lg:col-span-6 col-span-12 lg:block hidden"
          >
            <div className="ml-10 relative">
              {/* ලස්සන Glow එකක් image එක පිටිපස්සෙන් */}
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full"></div>
              <Image
                src={`/images/hero/banner-image.png`}
                alt="Yashith Sasmitha - Portfolio"
                width={800}
                height={800}
                className="relative z-10 object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <CardSlider />
        </div>
      </div>

      {/* Background Gradient Shapes */}
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
      <div className="absolute w-40 h-40 bg-primary/10 blur-[150px] rounded-full bottom-0 left-0 -z-1"></div>
    </section>
  );
};

export default Hero;