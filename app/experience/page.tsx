"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const timeline = [
    {
      year: "2025",
      title: "AI & Full-Stack Engineering",
      description: "Building AI-driven platforms and advanced automation systems.",
      details:
        "Leading development of enterprise AI solutions with focus on machine learning pipelines, natural language processing, and intelligent automation. Architecting microservices infrastructure and implementing real-time data processing systems.",
      skills: ["Python", "TensorFlow", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      year: "2024",
      title: "Pundit Trading Platform",
      description: "Developed a complete learning + trading ecosystem.",
      details:
        "Full-stack development of fintech platform including real-time market data integration, portfolio management systems, and educational content delivery. Implemented secure payment processing and compliance frameworks.",
      skills: ["React", "Node.js", "Docker", "Stripe API", "WebSockets"],
    },
    {
      year: "2023–2024",
      title: "Flutter Mobile Engineering",
      description: "Built multiple mobile apps including MediBot AI.",
      details:
        "Developed cross-platform mobile applications with focus on healthcare technology. Created MediBot AI for medical consultations using NLP. Implemented offline-first architecture and real-time synchronization.",
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "SQLite"],
    },
    {
      year: "2022–2023",
      title: "Backend Engineering",
      description: "Designed scalable APIs, auth systems, and secure data flows.",
      details:
        "Architected scalable backend systems handling millions of requests daily. Implemented OAuth 2.0, JWT authentication, and role-based access control. Optimized database queries and designed caching strategies for high-performance applications.",
      skills: ["Express.js", "MongoDB", "Redis", "GraphQL", "JWT"],
    },
    {
      year: "Level 400",
      title: "BSc Computer Science",
      description: "Deep study of algorithms, systems design, and software engineering.",
      details:
        "Comprehensive computer science curriculum covering data structures, algorithms, operating systems, database design, software engineering principles, and network architecture. Developed strong foundation in computational thinking and problem-solving.",
      skills: ["Algorithms", "Data Structures", "System Design", "OOP", "Databases"],
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Experience</h1>
          <p className="text-xl text-secondary mb-16">The journey that shaped my technical expertise.</p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

            <div className="space-y-12 relative">
              {timeline.map((item, index) => (
                <div key={index} className={`md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 md:px-8">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-background bg-primary transform md:-translate-x-1/2 -translate-y-1.5" />
                    <div
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="ml-12 md:ml-0 bg-card border border-border rounded-lg p-8 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 group"
                    >
                      <div className="text-accent font-bold text-sm mb-2 group-hover:text-secondary transition-colors">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>

                      {/* Expanded Content */}
                      {expandedIndex === index && (
                        <div className="mt-6 pt-6 border-t border-border space-y-4 animate-in fade-in duration-300">
                          <p className="text-gray-300">{item.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chevron Icon */}
                      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 md:hidden">
                        <ChevronRight
                          size={20}
                          className={`transition-transform duration-300 ${expandedIndex === index ? "rotate-90" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Click on any card to see more details</h3>
            <p className="text-gray-400">
              Explore the full scope of projects and technical skills involved in each experience.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
