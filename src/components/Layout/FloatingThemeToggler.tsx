"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

const FloatingThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-[999] w-12 h-12 bg-white/5 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center opacity-50">
        <div className="w-5 h-5 rounded-full bg-slate-700 animate-pulse"></div>
      </div>
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="fixed top-6 right-6 z-[999] w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/60 dark:bg-white/10 text-white border border-white/10 hover:border-primary/40 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl shadow-black/20 group cursor-pointer"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <Icon 
            icon="tabler:sun" 
            className="w-5.5 h-5.5 text-primary group-hover:rotate-45 transition-transform duration-500" 
          />
        ) : (
          <Icon 
            icon="tabler:moon" 
            className="w-5.5 h-5.5 text-yellow-500 group-hover:-rotate-12 transition-transform duration-500" 
          />
        )}
      </div>
    </button>
  );
};

export default FloatingThemeToggler;
