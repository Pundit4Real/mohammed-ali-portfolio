"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import apiClient from "@/utils/apiClient"
import SkeletonProjectCard from "@/components/ui/SkeletonProjectCard"

type ProjectHeaderProps = {
  headline: string
  subheadline: string
}

type ProjectContentProps = {
  id: string
  title: string
  subtitle: string
  description: string
  category: Array<{ name?: string; value?: string }>
  tech_stack: string[]
  tags: string | string[]
  github_link: string
  live_demo: string
  live_link: string
  images: Array<{ id: number; image: string }>
}

type ProjectDataProps = {
  hero: ProjectHeaderProps
  data: ProjectContentProps[]
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [projectsContent, setProjectContent] = useState<ProjectDataProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiClient.get("/projects/")
        setProjectContent(response.data)
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const dynamicFilters = ["All"]

  if (projectsContent?.data) {
    const categoryFilters = new Set<string>()
    projectsContent.data.forEach((project) => {
      project.category?.forEach((c) => {
        if (c?.name) categoryFilters.add(c.name)
      })
    })
    dynamicFilters.push(...Array.from(categoryFilters))
  }

  const filteredProjects =
    activeFilter === "All"
      ? projectsContent?.data || []
      : projectsContent?.data.filter((project) =>
          project.category?.some((c) => c.name === activeFilter)
        ) || []

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            // Skeleton Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonProjectCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {projectsContent?.hero.headline}
              </h1>
              <p className="text-xl text-secondary mb-12">
                {projectsContent?.hero.subheadline}
              </p>

              <div className="flex flex-wrap gap-3 mb-16">
                {dynamicFilters.map((filter) => (
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer h-full">
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                        <img
                          src={
                            project.images && project.images.length > 0
                              ? project.images[0].image
                              : "/placeholder.svg"
                          }
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        <p className="text-gray-400">{project.subtitle}</p>

                        <div className="flex flex-wrap gap-2">
                          {(project.category || []).map((category, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="border-secondary/50 text-secondary text-xs"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(project.tags) ? project.tags : project.tags?.split(","))
                            ?.filter(Boolean)
                            ?.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-primary/50 text-primary text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
