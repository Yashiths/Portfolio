"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { pricedeta } from "@/app/(site)/api/data";

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="lg:-mt-16 mt-16">
      <Slider {...settings}>
        {pricedeta.map((item, index) => (
          <div key={index} className="pr-6">
            <div className="px-5 py-6 bg-slate-50 dark:bg-dark_grey/80 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm dark:shadow-md transition-all duration-300">
              <div className="flex items-center gap-5">
                <div
                  className={`${item.background} ${item.padding} rounded-full flex items-center justify-center text-primary dark:text-white bg-primary/10 dark:bg-primary/20`}
                >
                  {item.icon}
                </div>
                <div className="text-slate-800 dark:text-white text-xs font-normal">
                  <p className="text-16 font-bold mr-2 text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </p>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">{item.short}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-7">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mb-1">Stack</p>
                  <p className="text-14 font-black text-slate-800 dark:text-white mb-0 leading-none">
                    {item.price}
                  </p>
                </div>
                <div>
                  <span className="text-emerald-600 dark:text-primary text-[10px] uppercase font-bold tracking-wider">{item.mark}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;