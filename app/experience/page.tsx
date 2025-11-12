"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const timeline = [
    {
      year: "April 2025",
      title: "KTechHub, Accra – Backend Developer",
      description: "Developed and maintained scalable backend services.",
      details:
        "• Developed and maintained backend services using Python, Django, and FastAPI, ensuring scalability, security, and high performance.\n• Designed and implemented RESTful APIs to enable seamless integration with frontend applications and third-party services.",
      skills: ["Python", "Django", "FastAPI", "REST APIs", "PostgreSQL", "AWS"],
    },
    {
      year: "July 2024 – Jan 2025",
      title: "MPedigree, Ghana – Backend & Mobile Developer",
      description: "Built cross-platform mobile apps and backend services.",
      details:
        "• Led the development of mobile applications using Flutter, achieving 100% cross-platform compatibility and delivering high-quality, intuitive user interfaces.\n• Contributed to backend development for the Signets platform, leveraging Python for robust server-side logic and implementing RESTful APIs.",
      skills: ["Flutter", "Dart", "Python", "REST APIs", "SQLite", "Firebase"],
    },
    {
      year: "Feb 2023 – Dec 2024",
      title: "CoupCode, Accra – Python Backend Developer",
      description: "Backend development for an event management platform.",
      details:
        "• Contributed to backend development for an event management platform, leveraging Python for robust server-side logic and implementing RESTful APIs.\n• Collaborated closely with frontend peers to ensure seamless integration, enhancing user experience and data flow.",
      skills: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Redis", "Docker"],
    },
    {
      year: "April 2022 – April 2023",
      title: "Tropical Technologies, Accra – Python Backend Developer",
      description: "Built core backend infrastructure for a crypto exchange.",
      details:
        "• Developed core backend infrastructure for a user-centric crypto exchange using Python, ensuring real-time data processing and optimal performance.\n• Collaborated with DevOps and frontend teams to deploy and maintain the platform, contributing to a user-friendly trading environment.",
      skills: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Docker", "AWS"],
    },
    {
      year: "2025",
      title: "AI & Full-Stack Engineering",
      description: "Building AI-driven platforms and advanced automation systems.",
      details:
        "Leading development of enterprise AI solutions with focus on machine learning pipelines, natural language processing, and intelligent automation. Architecting microservices infrastructure and implementing real-time data processing systems.",
      skills: ["Python", "TensorFlow", "Node.js", "PostgreSQL", "AWS", "NLP", "ML Models"],
    },
    {
      year: "2024",
      title: "Pundit Trading Platform",
      description: "Developed a complete learning + trading ecosystem.",
      details:
        "Full-stack development of a fintech platform including real-time market data integration, portfolio management systems, and educational content delivery. Implemented secure payment processing, dashboards, and compliance frameworks.",
      skills: ["React", "Node.js", "Docker", "Stripe API", "WebSockets", "Chart.js", "AWS"],
    },
    {
      year: "2023–2024",
      title: "Flutter Mobile Engineering",
      description: "Built multiple mobile apps including MediBot AI.",
      details:
        "Developed cross-platform mobile applications with focus on healthcare technology. Created MediBot AI for medical consultations using NLP. Implemented offline-first architecture, real-time synchronization, and seamless UX.",
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "SQLite", "React Native"],
    },
    {
      year: "2022–2023",
      title: "Backend Engineering",
      description: "Designed scalable APIs, authentication, and secure data flows.",
      details:
        "Architected backend systems handling millions of requests daily. Implemented OAuth2, JWT authentication, role-based access control, optimized queries, and caching strategies for high-performance applications.",
      skills: ["Express.js", "MongoDB", "Redis", "GraphQL", "JWT", "FastAPI"],
    },
    {
      year: "Level 400",
      title: "BSc Computer Science",
      description: "Deep study of algorithms, systems design, and software engineering.",
      details:
        "Comprehensive curriculum covering data structures, algorithms, operating systems, database design, software engineering principles, and network architecture. Built strong foundation in computational thinking and problem-solving.",
      skills: ["Algorithms", "Data Structures", "OOP", "System Design", "Databases", "Python", "Flutter", "React"],
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Experience</h1>
          <p className="text-xl text-secondary mb-16">The journey that shaped my technical expertise.</p>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto pb-12">
            {/* Timeline Line (contained, no overflow) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-3rem)] bg-gradient-to-b from-primary via-secondary to-accent rounded-full pointer-events-none" />

            <div className="space-y-14 relative">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                {/* Circular marker with dynamic gradient glow */}
                <span
                  className="absolute left-1/2 w-7 h-7 rounded-full border-4 border-background transform -translate-x-1/2 z-10 bg-gradient-to-b from-primary via-secondary to-accent shadow-[0_0_20px_6px_rgba(56,189,248,0.4)] animate-[glowPulse_3s_ease-in-out_infinite]"
                ></span>

                  {/* Experience card */}
                  <div
                    className={`relative md:w-1/2 md:px-8 ${
                      index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
                  >
                    <div
                      className="relative z-10 bg-card border border-border rounded-lg p-8 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="text-accent font-bold text-sm mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-2 hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>

                      {/* Hover details (only when hovering directly on card) */}
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          hoveredIndex === index
                            ? "max-h-[500px] opacity-100 mt-6 pt-6 border-t border-border"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-300 whitespace-pre-line">{item.details}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
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

                      {/* Chevron (mobile) */}
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 md:hidden">
                        <ChevronRight
                          size={20}
                          className={`transition-transform duration-300 ${
                            hoveredIndex === index ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing section */}
          <div className="mt-20 p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Hover or tap any card to see full details</h3>
            <p className="text-gray-400">
              Explore the full scope of projects, roles, and technical skills involved in each experience.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
