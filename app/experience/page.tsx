"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonExperienceCard from "@/components/ui/SkeletonExperienceCard";

type ExperienceHeaderProps = { headline: string; subheadline: string };
type ExperienceSkillsProps = { id: string; name: string; level: string };
type ExperienceContentProps = {
  id: string;
  role: string;
  company: string;
  subtitle: string;
  description: string;
  start_date: string;
  end_date: string;
  skills_used: ExperienceSkillsProps[];
};
type ExperienceDataProps = { hero: ExperienceHeaderProps; data: ExperienceContentProps[] };

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [experienceContent, setExperienceContent] = useState<ExperienceDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const experienceData = async () => {
      try {
        const response = await apiClient.get("/experience/");
        setExperienceContent(response.data);
      } catch (error) {
        console.error("Failed to load experience:", error);
      } finally {
        setLoading(false);
      }
    };
    experienceData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto relative">
          {loading ? (
            <div className="space-y-14 relative">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonExperienceCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {experienceContent?.hero.headline}
              </h1>
              <p className="text-xl text-secondary mb-16">{experienceContent?.hero.subheadline}</p>

              {/* Timeline Container */}
              <div className="relative max-w-4xl mx-auto pb-12">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-3rem)] bg-gradient-to-b from-primary via-secondary to-accent rounded-full pointer-events-none" />

                <div className="space-y-14 relative">
                  {experienceContent?.data.map((item, index) => (
                    <div
                      key={index}
                      className={`relative md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <span
                        className="absolute left-1/2 w-7 h-7 rounded-full border-4 border-background transform -translate-x-1/2 z-10 bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_20px_6px_rgba(56,189,248,0.4)] animate-[glowPulse_3s_ease-in-out_infinite]"
                      ></span>

                      <div className={`relative md:w-1/2 md:px-8 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                        <div
                          className="relative z-10 bg-card border border-border rounded-lg p-8 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="flex justify-end items-center gap-2 text-xs mb-2">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{item.start_date}</span>
                            <span className="text-accent font-semibold">—</span>
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{item.end_date}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 hover:text-primary transition-colors duration-300">
                            {item.role} @ {item.company}
                          </h3>
                          <p className="text-gray-400">{item.subtitle}</p>

                          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            hoveredIndex === index ? "max-h-[500px] opacity-100 mt-6 pt-6 border-t border-border" : "max-h-0 opacity-0"
                          }`}>
                            <p className="text-gray-300 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.description }} />
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.skills_used.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 md:hidden">
                            <ChevronRight size={20} className={`transition-transform duration-300 ${hoveredIndex === index ? "rotate-90" : ""}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Hover or tap any card to see full details</h3>
                <p className="text-gray-400">
                  Explore the full scope of projects, roles, and technical skills involved in each experience.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
