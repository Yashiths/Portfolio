"use client";
import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { Icon } from "@iconify/react";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-darkmode border-t border-white/5">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 lg:gap-20 md:gap-6 sm:gap-12 gap-6 pb-16">
          
          {/* Brand & Social Section */}
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-darkmode w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl">
                YS
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Yashith<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-white text-opacity-60 text-16 max-w-xs leading-relaxed">
              Building modern web applications with a focus on performance and exceptional user experiences.
            </p>
            
            <div className="flex gap-6 items-center mt-8">
              <Link href="#" className="group">
                <Icon icon="fa6-brands:facebook-f" width="24" height="24" className="text-white group-hover:text-primary transition-all" />
              </Link>
              <Link href="#" className="group">
                <Icon icon="fa6-brands:instagram" width="24" height="24" className="text-white group-hover:text-primary transition-all" />
              </Link>
              <Link href="#" className="group">
                <Icon icon="fa6-brands:x-twitter" width="24" height="24" className="text-white group-hover:text-primary transition-all" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-4 md:col-span-3 col-span-6">
            <h4 className="text-white mb-6 font-medium text-24">Quick Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href || "#"}
                    className="text-white text-opacity-60 hover:text-primary text-17 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 md:col-span-3 col-span-6">
            <h4 className="text-white text-24 font-medium mb-6">Subscribe</h4>
            <p className="text-white text-opacity-60 text-18 mb-6">
              Subscribe to get the latest updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email"
                className="bg-transparent border border-white border-opacity-20 py-4 text-white rounded-lg w-full px-6 outline-none focus:border-primary transition-all"
              />
              <Icon
                icon="tabler:send"
                width="24"
                height="24"
                className="text-primary absolute right-6 bottom-4 cursor-pointer hover:scale-110 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white border-opacity-5 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <h3 className="text-white text-opacity-60 text-16 font-medium">
            2026 Copyright | <span className="text-white">Yashith Sasmitha</span>
          </h3>
          <h3 className="text-white text-opacity-60 text-16 font-medium">
            Distributed by <Link href="/" className="text-primary hover:underline">Yashith</Link>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;