"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Github, ExternalLink } from "lucide-react"
import apiClient from "@/utils/apiClient"
import SkeletonGrid from "@/components/ui/SkeletonGrid"

type ProjectContentProps = {
  id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  category: Array<{ name?: string; value?: string }>
  tech_stack: string[]
  github_link: string
  live_demo: string
  live_link: string
  images: Array<{ id: number; image: string }>
}

type ProjectDataProps = {
  projectId: string
}

export default function ProjectDetailClient({ projectId }: ProjectDataProps) {
  const [project, setProject] = useState<ProjectContentProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState<string>("")
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiClient.get("/projects/")
        const selected = response.data.data.find(
          (p: ProjectContentProps) => p.id === projectId
        )
        setProject(selected || null)
        if (selected?.images?.length) {
          setMainImage(selected.images[0].image)
          setActiveImageId(selected.images[0].id)
        }
      } catch (error) {
        console.error("Failed to load project:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [projectId])

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col">
            <Navbar />
            <section className="flex-1 py-20 px-4">
                <SkeletonGrid />
            </section>
            <Footer />
            </main>
        )
    }

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 py-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <Link
              href="/projects"
              className="text-primary hover:text-secondary transition-colors"
            >
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
        <div className="max-w-7xl mx-auto">
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
            <p className="text-xl text-secondary mb-6">{project.subtitle}</p>

            <div className="flex flex-wrap gap-2">
              {project.category?.map((cat, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  {cat.name || cat.value}
                </Badge>
              ))}
            </div>
          </div>

          {/* Main Project Image */}
          <div className="rounded-lg overflow-hidden border border-border mb-4 h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Thumbnails Carousel */}
          {project.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mb-8">
              {project.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={project.title}
                  onClick={() => {
                    setMainImage(img.image)
                    setActiveImageId(img.id)
                  }}
                  className={`w-40 h-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform
                    ${
                      activeImageId === img.id
                        ? "border-primary/70 ring-2 ring-primary/40"
                        : "border-border"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Full Description */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                    >
                      <Github size={18} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.live_demo && (
                    <a
                      href={project.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Site</span>
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
              {project.tech_stack.map((tech, i) => (
                <Badge
                  key={i}
                  className="bg-primary/20 border border-primary/50 text-primary"
                >
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
