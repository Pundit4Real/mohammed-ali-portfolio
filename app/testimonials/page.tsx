"use client"

import { Navbar } from "@/components/navbar"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      quote:
        "A brilliant engineer with strong AI intuition. Mohammed delivered exceptional results on our complex AI system.",
      person: "James — Startup Founder",
      image: "/professional-headshot.png",
    },
    {
      quote: "Delivered our project faster and better than expected. Highly recommend for any serious technical work.",
      person: "Karim — Small Business Owner",
      image: "/professional-headshot.png",
    },
    {
      quote:
        "His attention to system architecture is exceptional. A rare blend of technical skill and business acumen.",
      person: "Linda — CTO",
      image: "/professional-headshot.png",
    },
  ]

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <main>
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Testimonials</h1>
          <p className="text-xl text-secondary mb-16">What people say about working with me.</p>

          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            <blockquote className="text-2xl font-light italic text-gray-300">
              "{testimonials[current].quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].person}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{testimonials[current].person}</p>
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
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? "bg-primary w-8" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
