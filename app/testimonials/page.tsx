"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonTestimonialCard from "@/components/ui/SkeletonTestimonialCard";

type TestimonialsHeaderProps = { headline: string; subheadline: string };
type TestimonialsStatsProps = { total_testimonials: number; average_rating: number; satisfaction_rate: string; happy_clients: number };
type TestimonialsContestsProps = { id: string; feedback: string; name: string; role: string; company: string; image: string; rating: number };
type TestimonialsDataProps = { hero: TestimonialsHeaderProps; data: TestimonialsContestsProps[]; stats: TestimonialsStatsProps };

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [testimonialsContent, setTestimonialsContent] = useState<TestimonialsDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testimonialsData = async () => {
      try {
        const response = await apiClient.get("/testimonials/");
        setTestimonialsContent(response.data);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    testimonialsData();
  }, []);

  const next = () =>
    setCurrent((current + 1) % (testimonialsContent?.stats.total_testimonials || 1));
  const prev = () =>
    setCurrent((current - 1 + (testimonialsContent?.stats.total_testimonials || 1)) %
      (testimonialsContent?.stats.total_testimonials || 1));

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <SkeletonTestimonialCard />
          ) : testimonialsContent ? (
            <>
              {/* Header */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
                {testimonialsContent.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-secondary text-center mb-12">
                {testimonialsContent.hero.subheadline}
              </p>

              {/* Testimonial Card */}
              <div className="bg-card border border-border rounded-lg p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
                
                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const isFilled = i < (testimonialsContent.data?.[current]?.rating ?? 0);
                    return (
                      <Star
                        key={i}
                        size={20}
                        className={isFilled ? "fill-accent text-accent" : "text-accent/30"}
                      />
                    );
                  })}
                </div>

                {/* Feedback */}
                <blockquote className="text-xl sm:text-2xl font-light italic text-gray-300 text-center leading-relaxed">
                  "{testimonialsContent.data[current].feedback}"
                </blockquote>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border">
                  
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonialsContent.data[current].image || "/placeholder.svg"}
                      alt={testimonialsContent.data[current].name || "Client Photo"}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white text-center sm:text-left">
                        {testimonialsContent.data[current].name}  
                        <span className="text-gray-400 font-light"> — {testimonialsContent.data[current].role}</span>
                      </p>
                      <p className="text-sm text-gray-400">{testimonialsContent.data[current].company}</p>
                    </div>
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-4">
                    <button
                      onClick={prev}
                      className="p-2 rounded-full border border-border hover:bg-primary/10 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={next}
                      className="p-2 rounded-full border border-border hover:bg-primary/10 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonialsContent.data.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current ? "bg-primary w-6" : "bg-gray-600 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-lg border border-border">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{testimonialsContent.stats.happy_clients}</div>
                  <p className="text-gray-400 mt-1">Happy Clients</p>
                </div>

                <div className="text-center p-6 bg-secondary/5 rounded-lg border border-border">
                  <div className="text-3xl md:text-4xl font-bold text-secondary">{testimonialsContent.stats.average_rating}</div>
                  <p className="text-gray-400 mt-1">Average Rating</p>
                </div>

                <div className="text-center p-6 bg-accent/5 rounded-lg border border-border">
                  <div className="text-3xl md:text-4xl font-bold text-accent">{testimonialsContent.stats.satisfaction_rate}</div>
                  <p className="text-gray-400 mt-1">Satisfaction Rate</p>
                </div>
              </div>

            </>
          ) : (
            <p className="text-red-500">Failed to load testimonials.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
