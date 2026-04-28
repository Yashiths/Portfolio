"use client";

import React, { useEffect, useState } from "react";
import { renderSimpleIcon, fetchSimpleIcons, Cloud, ICloud } from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineMethod: "none",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

const iconSlugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
  "mongodb",
  "mysql",
  "redux",
  "tailwindcss",
  "framer",
  "strapi",
  "appwrite",
  "adobephotoshop",
  "adobeillustrator",
  "adobepremierepro",
  "adobeaftereffects",
  "canva",
  "dribbble",
  "behance" 
];

export default function IconCloud() {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, []);

  if (!mounted || !data) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <p className="text-muted opacity-20">Loading Icons...</p>
      </div>
    );
  }

  const renderedIcons = Object.values(data.simpleIcons).map((icon: any) =>
    renderSimpleIcon({
      icon,
      size: 42,
      aProps: {
        onClick: (e: any) => e.preventDefault(),
      },
    })
  );

  return (
    <div className="relative flex h-full w-full max-w-[500px] items-center justify-center overflow-hidden bg-transparent">
      <Cloud {...cloudProps}>
        {renderedIcons}
      </Cloud>
    </div>
  );
}