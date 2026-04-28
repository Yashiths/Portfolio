import React from "react";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/work";
import TimeLine from "@/components/Home/timeline";
import Portfolio from "@/components/Home/portfolio";
import Upgrade from "@/components/Home/upgrade";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Yashith Sasmitha",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <TimeLine />
      <Portfolio />
      <Upgrade />
    </main>
  );
}
