"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import apiClient from "@/utils/apiClient"

type TestimonialsHeaderProps = {
  headline: string;
  subheadline: string;
}

type TestimonialsStatsProps = {
  total_testimonials: number;
  average_rating: number;
  satisfaction_rate: string;
  happy_clients: number;
}

type TestimonialsContestsProps = {
  id: string;
  feedback: string;  
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

type TestimonialsDataProps = {
  hero: TestimonialsHeaderProps;
  data: TestimonialsContestsProps[];
  stats: TestimonialsStatsProps;
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [testimonialsContent, setTestimonialsContent] = useState<TestimonialsDataProps| null>(null);

  useEffect(() => {
    const testimonialsData = async () => {
      try {
        const response = await apiClient.get("/testimonials/");
        setTestimonialsContent(response.data);
        console.log("testimonials data",response)

      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };
    testimonialsData();
  }, []);

  const next = () => setCurrent((current + 1) % testimonialsContent?.stats.total_testimonials!)
  const prev = () => setCurrent((current - 1 + testimonialsContent?.stats.total_testimonials!) % testimonialsContent?.stats.total_testimonials!)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{testimonialsContent?.hero.headline}</h1>
          <p className="text-xl text-secondary mb-16">{testimonialsContent?.hero.subheadline}</p>

          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            {/* Star Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < (testimonialsContent?.data?.[current]?.rating ?? 0);
                return (
                  <Star key={i} size={20} className={isFilled ? "fill-accent text-accent" : "text-accent/30"}/>
                );
              })}
            </div>
            <blockquote className="text-2xl font-light italic text-gray-300">
              "{testimonialsContent?.data[current].feedback}"
            </blockquote>

            <div className="flex items-center justify-between pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <img
                  src={testimonialsContent?.data[current].image || "/placeholder.svg"}
                  alt={testimonialsContent?.data[current].name || "Client Photo"}
                  className="w-16 h-16 rounded-full border border-border"
                />
                <div>
                  <p className="font-semibold text-white">{testimonialsContent?.data[current].name} - {testimonialsContent?.data[0].role}</p>
                  <p className="text-sm text-gray-400">{testimonialsContent?.data[current].company}</p>
                </div>
              </div>

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
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsContent?.data.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "bg-primary w-8" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-primary/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-2">{testimonialsContent?.stats.happy_clients}</div>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            <div className="text-center p-8 bg-secondary/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-secondary mb-2">{testimonialsContent?.stats.average_rating}</div>
              <p className="text-gray-400">Average Rating</p>
            </div>
            <div className="text-center p-8 bg-accent/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-accent mb-2">{testimonialsContent?.stats.satisfaction_rate}</div>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
