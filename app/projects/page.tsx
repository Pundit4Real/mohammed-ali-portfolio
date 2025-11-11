"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "AI/ML", "Web Apps", "Mobile Apps", "Blockchain", "Automation", "Open Source"]

  const projects = [
    {
      title: "MediBot AI",
      description: "AI-powered virtual healthcare assistant with NLP, triage logic, and smart recommendations.",
      tags: ["AI/ML", "Mobile Apps"],
      image: "/medical-ai-interface.jpg",
    },
    {
      title: "Blockchain E-Voting System (DID)",
      description: "A secure decentralized voting platform with identity verification and cryptographic proof.",
      tags: ["Blockchain", "Web Apps"],
      image: "/blockchain-voting-interface.png",
    },
    {
      title: "Remote Desktop Platform",
      description:
        "Cloud-based remote control system with file transfer, sessions, encryption, and cross-platform support.",
      tags: ["Web Apps", "Automation"],
      image: "/remote-desktop-interface.jpg",
    },
    {
      title: "Pundit Trading Platform",
      description: "A multi-service trading suite with courses, dashboards, accounts, analytics, and automation.",
      tags: ["Web Apps"],
      image: "/trading-dashboard.png",
    },
    {
      title: "Study Bud Smart Learning System",
      description: "AI study assistant with document analysis, chatbot, intelligent scheduler, and quiz system.",
      tags: ["AI/ML", "Web Apps"],
      image: "/learning-platform-interface.png",
    },
    {
      title: "Global Payment Gateway",
      description: "Custom payment infrastructure supporting global in-payments and crypto-only payouts.",
      tags: ["Web Apps", "Automation"],
      image: "/payment-gateway-interface.png",
    },
  ]

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Projects</h1>
          <p className="text-xl text-secondary mb-12">A curated selection of my best technical work.</p>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "border border-border text-gray-400 hover:border-primary/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
              >
                <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="border-secondary/50 text-secondary text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
