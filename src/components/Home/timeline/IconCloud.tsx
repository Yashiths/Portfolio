"use client";

import React from "react";

const technologies = [
  {
    name: "React.js",
    category: "Frontend Dev",
    color: "group-hover:border-[#61dafb]/40",
    glow: "group-hover:shadow-[0_0_25px_rgba(97,218,251,0.25)]",
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 text-[#61dafb] fill-none stroke-[#61dafb] stroke-[1.2] transition-transform duration-1000 group-hover:rotate-180">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" stroke="none" />
        <g>
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  },
  {
    name: "Next.js",
    category: "Full Stack Framework",
    color: "group-hover:border-slate-900/40 dark:group-hover:border-white/40",
    glow: "group-hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]",
    svg: (
      <svg viewBox="0 0 180 180" className="w-12 h-12 fill-slate-950 dark:fill-white">
        <circle cx="90" cy="90" r="90" fill="currentColor" className="text-slate-900 dark:text-white" />
        <path d="M140 135 L80 60 H70 V120 H80 V80 L135 147 Z" fill="currentColor" className="text-white dark:text-slate-900" />
        <rect x="110" y="60" width="10" height="60" fill="currentColor" className="text-white dark:text-slate-900" />
      </svg>
    )
  },
  {
    name: "Node.js",
    category: "Backend Engine",
    color: "group-hover:border-[#339933]/40",
    glow: "group-hover:shadow-[0_0_25px_rgba(51,153,51,0.25)]",
    svg: (
      <svg viewBox="0 0 256 284" className="w-12 h-12">
        <path d="M211.5 61.3l-73.8-42.5c-6.1-3.5-13.6-3.5-19.7 0L44.2 61.3C38 64.9 34.2 71.4 34.2 78.5v85c0 7.1 3.8 13.6 10 17.2l73.8 42.5c6.1 3.5 13.6 3.5 19.7 0l73.8-42.5c6.2-3.6 10-10.1 10-17.2v-85c0-7.1-3.8-13.6-10-17.2z" fill="#339933" />
        <path d="M128 12.5L54.2 55.1v85.2L128 183v-170.5z" fill="#66cc33" />
      </svg>
    )
  },
  {
    name: "Firebase",
    category: "Serverless System",
    color: "group-hover:border-[#FFA611]/40",
    glow: "group-hover:shadow-[0_0_25px_rgba(255,166,17,0.25)]",
    svg: (
      <svg viewBox="0 0 256 351" className="w-12 h-12">
        <path d="M1.2 280.3c-.6 4.7 2.1 9.2 6.5 10.7l102.7 34.8c11.1 3.8 23.3 3.8 34.4 0l102.7-34.8c4.4-1.5 7.1-6 6.5-10.7L219 28.5c-.7-5.1-5.7-8.3-10.5-6.7L128 78 47.5 21.8c-4.8-1.6-9.8 1.6-10.5 6.7L1.2 280.3z" fill="#FFA611" />
        <path d="M144.5 10.1c-4.7-4.1-12.2-2.8-15.1 2.8L1.2 280.3c-.6 4.7 2.1 9.2 6.5 10.7l102.7 34.8c11.1 3.8 23.3 3.8 34.4 0l102.7-34.8c4.4-1.5 7.1-6 6.5-10.7L144.5 10.1z" fill="#F58220" />
        <path d="M128 78l80.5-56.2c4.8-1.6 9.8 1.6 10.5 6.7L194.2 248 128 78z" fill="#F58220" />
        <path d="M128 78L47.5 21.8c-4.8-1.6-9.8 1.6-10.5 6.7L1.2 280.3l126.8-202.3z" fill="#FFA611" />
        <path d="M128 78V12l-37 72.8c-2.4 4.7-1.4 10.4 2.5 14L128 78z" fill="#F58220" />
        <path d="M128 78l34.5 20.8c3.9-3.6 4.9-9.3 2.5-14L128 78z" fill="#FFA611" />
      </svg>
    )
  },
  {
    name: "Temenos T24",
    category: "Core Banking Systems",
    color: "group-hover:border-[#477E70]/40",
    glow: "group-hover:shadow-[0_0_25px_rgba(71,126,112,0.25)]",
    svg: (
      <svg viewBox="0 0 240 240" className="w-12 h-12 text-[#477E70] dark:text-primary fill-none stroke-[2]">
        <polygon points="120,20 220,70 220,170 120,220 20,170 20,70" className="stroke-slate-300 dark:stroke-slate-700 fill-slate-100 dark:fill-slate-900/50" />
        <path d="M60,95 L180,95 M60,145 L180,145 M95,60 L95,180 M145,60 L145,180" className="stroke-slate-400/30 dark:stroke-primary/10" />
        <rect x="85" y="85" width="70" height="70" rx="10" className="stroke-[#477E70] dark:stroke-primary fill-white dark:fill-darkmode" />
        <circle cx="120" cy="120" r="15" className="stroke-[#477E70] dark:stroke-primary" />
        <line x1="120" y1="105" x2="120" y2="135" className="stroke-[#477E70] dark:stroke-primary" />
        <line x1="105" y1="120" x2="135" y2="120" className="stroke-[#477E70] dark:stroke-primary" />
        <text x="120" y="195" textAnchor="middle" className="fill-slate-900 dark:fill-white font-black text-22 italic tracking-widest uppercase">T24</text>
      </svg>
    )
  }
];

export default function IconGrid() {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-center p-4">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className={`group relative flex flex-col items-center justify-center w-36 h-36 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 ${tech.color} ${tech.glow} transition-all duration-300 shadow-sm hover:-translate-y-1 hover:scale-105 select-none`}
        >
          {/* SVG Container */}
          <div className="w-16 h-16 flex items-center justify-center mb-3">
            {tech.svg}
          </div>
          
          {/* Label */}
          <div className="text-center px-2">
            <p className="text-[12px] font-bold text-slate-800 dark:text-white leading-none">
              {tech.name}
            </p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold tracking-wider leading-none">
              {tech.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}