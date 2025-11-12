"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft, Github, ExternalLink, FileText, Folder } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { use } from "react"

const projectsData = [
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

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params) // unwrap the promise
  const project = projectsData.find((p) => p.id === unwrappedParams.id)

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 py-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <Link href="/projects" className="text-primary hover:text-secondary transition-colors">
              Back to Projects
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/projects"
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
          >
            <ChevronLeft size={20} />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-8 mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-secondary mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="border-secondary/50 text-secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Image */}
          <div className="rounded-lg overflow-hidden border border-border mb-8 h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Full Description */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed">{project.fullDescription}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                    >
                      <Github size={18} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Site</span>
                    </a>
                  )}
                  {project.links.docs && (
                    <a
                      href={project.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    >
                      <FileText size={18} />
                      <span>Docs</span>
                    </a>
                  )}
                  {project.links.contract && (
                    <a
                      href={project.links.contract}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Contract</span>
                    </a>
                  )}
                  {project.links.api && (
                    <a
                      href={project.links.api}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>API</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <Badge key={i} className="bg-primary/20 border border-primary/50 text-primary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
