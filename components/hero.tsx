"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonHero from "@/components/ui/SkeletonHero";

type HomeDataProps = {
  id: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  profile_image: string;
  resume: string;
};

export function Hero() {
  const [rotatingText, setRotatingText] = useState(0);
  const [homeContent, setHomeContent] = useState<HomeDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const keywords = homeContent[0]?.keywords || [];
      if (keywords.length > 0)
        setRotatingText((prev) => (prev + 1) % keywords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [homeContent]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await apiClient.get("/home/");
        setHomeContent(response.data);
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const homeData = homeContent[0];

  if (loading) return <SkeletonHero />;

  return (
    <section className="max-w-7xl mx-auto px-4 min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-16 pb-16">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {homeData?.name}
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-2">
              {homeData?.title}
            </p>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            {homeData?.description}
          </p>

          {/* Rotating Keyword */}
          <div className="h-16 flex items-center">
            <span className="text-2xl md:text-3xl text-accent font-semibold">
              {homeData?.keywords?.[rotatingText]}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3"
            >
              Hire Me
              <ArrowRight size={20} />
            </Link>

            <a
              href={homeData?.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/10 transition-all"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="lg:flex justify-center">
          <div className="w-80 h-80 rounded-full border-4 border-primary/50 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 relative">
            <img
              src={homeData?.profile_image}
              alt={homeData?.name || "Profile"}
              className="w-72 h-72 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
