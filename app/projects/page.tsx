"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "AI/ML", "Web Apps", "Mobile Apps", "Blockchain", "Automation", "Open Source"]

  const projects = [
    {
      id: "medibot-ai",
      title: "MediBot AI",
      description: "AI-powered virtual healthcare assistant with NLP, triage logic, and smart recommendations.",
      fullDescription:
        "A comprehensive healthcare AI assistant that leverages natural language processing to provide medical triage, health recommendations, and symptom analysis. The system integrates with medical databases and provides real-time consultation support.",
      tags: ["AI/ML", "Mobile Apps"],
      image: "/medical-ai-interface.jpg",
      techStack: ["Python", "TensorFlow", "React Native", "Node.js", "PostgreSQL", "NLP", "ML Models"],
      links: {
        github: "https://github.com",
        demo: "https://demo.example.com",
        live: "https://example.com",
      },
      files: [
        { name: "ml-models", type: "folder" },
        { name: "api-backend", type: "folder" },
        { name: "mobile-app", type: "folder" },
        { name: "README.md", type: "file" },
      ],
    },
    {
      id: "blockchain-voting",
      title: "Blockchain E-Voting System (DID)",
      description: "A secure decentralized voting platform with identity verification and cryptographic proof.",
      fullDescription:
        "Enterprise-grade decentralized voting system utilizing blockchain technology for transparent, secure, and tamper-proof elections. Features decentralized identity (DID) for voter authentication and smart contracts for vote tallying.",
      tags: ["Blockchain", "Web Apps"],
      image: "/blockchain-voting-interface.png",
      techStack: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS", "Smart Contracts", "DID"],
      links: {
        github: "https://github.com",
        demo: "https://demo.example.com",
        contract: "https://etherscan.io",
      },
      files: [
        { name: "smart-contracts", type: "folder" },
        { name: "frontend", type: "folder" },
        { name: "backend", type: "folder" },
        { name: "tests", type: "folder" },
      ],
    },
    {
      id: "remote-desktop",
      title: "Remote Desktop Platform",
      description:
        "Cloud-based remote control system with file transfer, sessions, encryption, and cross-platform support.",
      fullDescription:
        "A robust remote desktop solution providing secure access to computers across networks with real-time collaboration features, encrypted connections, and file transfer capabilities.",
      tags: ["Web Apps", "Automation"],
      image: "/remote-desktop-interface.jpg",
      techStack: ["WebRTC", "Node.js", "React", "Electron", "AWS", "Encryption", "WebSockets"],
      links: {
        github: "https://github.com",
        docs: "https://docs.example.com",
      },
      files: [
        { name: "client", type: "folder" },
        { name: "server", type: "folder" },
        { name: "encryption", type: "folder" },
        { name: "config", type: "folder" },
      ],
    },
    {
      id: "pundit-trading",
      title: "Pundit Trading Platform",
      description: "A multi-service trading suite with courses, dashboards, accounts, analytics, and automation.",
      fullDescription:
        "Comprehensive trading platform offering real-time market analysis, educational courses, automated trading strategies, and advanced analytics dashboards for retail and institutional traders.",
      tags: ["Web Apps"],
      image: "/trading-dashboard.png",
      techStack: ["React", "Node.js", "PostgreSQL", "Chart.js", "WebSocket", "Docker", "AWS"],
      links: {
        github: "https://github.com",
        live: "https://example.com",
        api: "https://api.example.com",
      },
      files: [
        { name: "trading-engine", type: "folder" },
        { name: "analytics", type: "folder" },
        { name: "education", type: "folder" },
        { name: "dashboard", type: "folder" },
      ],
    },
    {
      id: "study-bud",
      title: "Study Bud Smart Learning System",
      description: "AI study assistant with document analysis, chatbot, intelligent scheduler, and quiz system.",
      fullDescription:
        "Intelligent learning platform that uses AI to analyze study materials, generate quizzes, schedule study sessions, and provide personalized learning recommendations to optimize educational outcomes.",
      tags: ["AI/ML", "Web Apps"],
      image: "/learning-platform-interface.png",
      techStack: ["Python", "OpenAI API", "React", "FastAPI", "MongoDB", "Celery", "Redis"],
      links: {
        github: "https://github.com",
        demo: "https://demo.example.com",
      },
      files: [
        { name: "ai-engine", type: "folder" },
        { name: "chatbot", type: "folder" },
        { name: "scheduler", type: "folder" },
        { name: "quiz-engine", type: "folder" },
      ],
    },
    {
      id: "payment-gateway",
      title: "Global Payment Gateway",
      description: "Custom payment infrastructure supporting global in-payments and crypto-only payouts.",
      fullDescription:
        "Innovative payment infrastructure enabling global payments with multi-currency support, crypto integration, and automated payout systems for international transactions.",
      tags: ["Web Apps", "Automation"],
      image: "/payment-gateway-interface.png",
      techStack: ["Node.js", "Stripe API", "Web3.js", "React", "PostgreSQL", "Docker", "Kubernetes"],
      links: {
        github: "https://github.com",
        docs: "https://docs.example.com",
      },
      files: [
        { name: "payment-processor", type: "folder" },
        { name: "crypto-integration", type: "folder" },
        { name: "webhooks", type: "folder" },
        { name: "api", type: "folder" },
      ],
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
            {filtered.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer h-full">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
