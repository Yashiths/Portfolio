"use client";
import React from "react";
import Header from "@/components/Layout/Header"; 
import Footer from "@/components/Layout/Footer";
import { GraduationCap, Award, Code2, Briefcase } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="bg-darkmode min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              I am a passionate Software Engineer dedicated to building high-performance web applications and exceptional user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Education Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={32} />
                <h2 className="text-white text-3xl font-bold">Education</h2>
              </div>
              
              <div className="space-y-8 border-l-2 border-white/5 ml-4 pl-8">
                {/* Qualification 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#00FF00]"></div>
                  <h3 className="text-white text-xl font-bold">B.Sc. in Software Engineering</h3>
                  <p className="text-primary font-medium mb-2">University Name / Institution</p>
                  <p className="text-muted text-sm italic">2021 - 2025</p>
                </div>

                {/* Qualification 2 (Optional) */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 bg-white/20 rounded-full"></div>
                  <h3 className="text-white text-xl font-bold">Higher National Diploma</h3>
                  <p className="text-primary font-medium mb-2">Institution Name</p>
                  <p className="text-muted text-sm italic">2019 - 2021</p>
                </div>
              </div>
            </div>

            {/* Experience & Skills Summary */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={32} />
                <h2 className="text-white text-3xl font-bold">Certifications</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <h4 className="text-white font-bold">Full Stack Development Certification</h4>
                  <p className="text-muted text-sm">Issued by [Platform Name]</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <h4 className="text-white font-bold">Cloud Computing Fundamentals</h4>
                  <p className="text-muted text-sm">Google Cloud / AWS</p>
                </div>
              </div>
            </div>

          </div>

          {/* Core Philosophy / Vision */}
          <div className="mt-24 bg-[#0b1120] rounded-[40px] p-10 border border-white/5 relative overflow-hidden text-center">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
             <h3 className="text-white text-2xl font-bold mb-4">My Goal</h3>
             <p className="text-muted text-lg max-w-3xl mx-auto leading-relaxed">
               To bridge the gap between complex backend systems and intuitive user interfaces, creating seamless digital solutions that solve real-world problems.
             </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;