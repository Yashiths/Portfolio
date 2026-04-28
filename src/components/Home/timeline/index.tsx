"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";
import IconCloud from "./IconCloud";

const skillsData = [
  { 
    icon: "images/timeline/icon-planning.svg", 
    title: "Frontend Development", 
    text: "Crafting modern web apps with React.js, Next.js, and Tailwind CSS."
  },
  { 
    icon: "images/timeline/icon-refinement.svg", 
    title: "Backend & DB", 
    text: "Building robust systems using Node.js, Express, and databases like MongoDB or PostgreSQL."
  },
  { 
    icon: "images/timeline/icon-prototype.svg", 
    title: "Full Stack Design", 
    text: "Ensuring high-performance and user-centric application architecture."
  },
  { 
    icon: "images/timeline/icon-support.svg", 
    title: "Cloud & Dev Tools", 
    text: "Leveraging Firebase, Docker, and Git for scalable solutions."
  }
];

const SkillsSection = () => {
  return (
    <section className="md:pt-40 pt-9" id="stack">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-50%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white sm:text-48 text-36 font-medium lg:w-[80%] mx-auto mb-6">
              Skills & Technologies
            </h2>
            <p className="text-muted text-opacity-80 sm:text-20 text-16 mb-20 max-w-[600px] mx-auto">
              Here are the technologies I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop View */}
            <div className="md:block hidden relative min-h-[650px] w-full">
              
              {/* Central Icon Cloud - Added pointer-events-auto */}
              <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-auto">
                <div className="w-[500px] h-[500px] flex items-center justify-center cursor-pointer">
                   <IconCloud />
                </div>
              </div>

              {/* Labels Layer - Added pointer-events-none so it doesn't block the cloud */}
              <div className="relative z-20 w-full h-full min-h-[650px] pointer-events-none">
                
                {/* Skill 1 - Top Left (Added pointer-events-auto to individual items) */}
                <div className="absolute top-0 left-0 w-80 flex items-center gap-4 text-right justify-end pointer-events-auto">
                  <div>
                    <h5 className="text-muted text-2xl font-medium">{skillsData[0].title}</h5>
                    <p className="text-sm text-muted opacity-60">{skillsData[0].text}</p>
                  </div>
                  <div className="bg-light_grey/20 p-4 rounded-full border border-white/5">
                    <Image src={`${getImagePrefix()}${skillsData[0].icon}`} alt={skillsData[0].title} width={40} height={40} />
                  </div>
                </div>

                {/* Skill 2 - Top Right */}
                <div className="absolute top-0 right-0 w-80 flex items-center gap-4 text-left pointer-events-auto">
                  <div className="bg-light_grey/20 p-4 rounded-full border border-white/5">
                    <Image src={`${getImagePrefix()}${skillsData[1].icon}`} alt={skillsData[1].title} width={40} height={40} />
                  </div>
                  <div>
                    <h5 className="text-muted text-2xl font-medium">{skillsData[1].title}</h5>
                    <p className="text-sm text-muted opacity-60">{skillsData[1].text}</p>
                  </div>
                </div>

                {/* Skill 3 - Bottom Left */}
                <div className="absolute bottom-10 left-0 w-80 flex items-center gap-4 text-right justify-end pointer-events-auto">
                  <div>
                    <h5 className="text-muted text-2xl font-medium">{skillsData[2].title}</h5>
                    <p className="text-sm text-muted opacity-60">{skillsData[2].text}</p>
                  </div>
                  <div className="bg-light_grey/20 p-4 rounded-full border border-white/5">
                    <Image src={`${getImagePrefix()}${skillsData[2].icon}`} alt={skillsData[2].title} width={40} height={40} />
                  </div>
                </div>

                {/* Skill 4 - Bottom Right */}
                <div className="absolute bottom-10 right-0 w-80 flex items-center gap-4 text-left pointer-events-auto">
                  <div className="bg-light_grey/20 p-4 rounded-full border border-white/5">
                    <Image src={`${getImagePrefix()}${skillsData[3].icon}`} alt={skillsData[3].title} width={40} height={40} />
                  </div>
                  <div>
                    <h5 className="text-muted text-2xl font-medium">{skillsData[3].title}</h5>
                    <p className="text-sm text-muted opacity-60">{skillsData[3].text}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-8 md:hidden mt-10">
              {skillsData.map((item, index) => (
                <div key={index} className="flex items-center gap-6 p-4 bg-light_grey/10 rounded-xl">
                  <div className="bg-primary/20 p-4 rounded-full">
                    <Image src={`${getImagePrefix()}${item.icon}`} alt={item.title} width={35} height={35} />
                  </div>
                  <div className="text-start">
                    <h4 className="text-white text-xl font-medium">{item.title}</h4>
                    <p className="text-muted text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;