"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    {
      quote:
        "A brilliant engineer with strong AI intuition. Mohammed delivered exceptional results on our complex AI system. His ability to architect scalable solutions is unmatched.",
      person: "James Chen — Startup Founder",
      company: "TechFlow AI",
      image: "/professional-headshot.png",
      rating: 5,
    },
    {
      quote:
        "Delivered our project faster and better than expected. Highly recommend for any serious technical work. Mohammed understood our vision and executed flawlessly.",
      person: "Karim Hassan — Small Business Owner",
      company: "E-Commerce Solutions",
      image: "/professional-headshot.jpg",
      rating: 5,
    },
    {
      quote:
        "His attention to system architecture is exceptional. A rare blend of technical skill and business acumen. Mohammed thinks not just about code, but about long-term scalability.",
      person: "Linda Johnson — CTO",
      company: "Digital Innovations Inc",
      image: "/professional-headshot.png",
      rating: 5,
    },
    {
      quote:
        "Working with Mohammed was a game-changer for our mobile app project. He brought innovative solutions and delivered ahead of schedule. Exceptional problem-solver.",
      person: "Alex Rodriguez — Product Manager",
      company: "Mobile First Startup",
      image: "/professional-headshot.jpg",
      rating: 5,
    },
    {
      quote:
        "Mohammed's expertise in AI and machine learning helped us transform our business processes. His insights and technical execution are top-tier. Highly professional.",
      person: "Sophia Williams — Operations Director",
      company: "Global Tech Corp",
      image: "/professional-headshot.png",
      rating: 5,
    },
    {
      quote:
        "Best investment we made was hiring Mohammed for our blockchain project. His understanding of distributed systems and security is incredible. Delivered complex requirements with ease.",
      person: "David Park — Blockchain Lead",
      company: "Crypto Ventures",
      image: "/professional-headshot.jpg",
      rating: 5,
    },
  ]

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Testimonials</h1>
          <p className="text-xl text-secondary mb-16">What people say about working with me.</p>

          <div className="bg-card border border-border rounded-lg p-12 space-y-8">
            {/* Star Rating */}
            <div className="flex gap-1">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={20} className="fill-accent text-accent" />
              ))}
            </div>

            <blockquote className="text-2xl font-light italic text-gray-300">
              "{testimonials[current].quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].person}
                  className="w-16 h-16 rounded-full border border-border"
                />
                <div>
                  <p className="font-semibold text-white">{testimonials[current].person}</p>
                  <p className="text-sm text-gray-400">{testimonials[current].company}</p>
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

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-primary/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary mb-2">{testimonials.length}</div>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            <div className="text-center p-8 bg-secondary/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-secondary mb-2">5.0</div>
              <p className="text-gray-400">Average Rating</p>
            </div>
            <div className="text-center p-8 bg-accent/5 rounded-lg border border-border">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
