"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import SkeletonAbout from "@/components/ui/SkeletonAbout"
import apiClient from "@/utils/apiClient"
import { useEffect, useState } from "react"

type AboutHeaderProps = {
  headline: string
  subheadline: string
}

type AboutExpertiseProps = {
  id: string
  title: string
  proficiency_level: string
  years_of_experience: number
}

type AboutContentProps = {
  id: string
  bio: string
  image: string
  expertise: AboutExpertiseProps[]
  tech_stack: string[]
}

type AboutDataProps = {
  hero: AboutHeaderProps
  data: AboutContentProps[]
}

export default function About() {
  const [aboutContent, setAboutContent] = useState<AboutDataProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const aboutData = async () => {
      try {
        const response = await apiClient.get("/about/")
        setAboutContent(response.data)
      } catch (error) {
        console.error("Failed to load about data:", error)
      } finally {
        setLoading(false)
      }
    }
    aboutData()
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <SkeletonAbout />
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {aboutContent?.hero.headline}
              </h1>
              <p className="text-xl text-secondary mb-16">
                {aboutContent?.hero.subheadline}
              </p>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={aboutContent?.data[0].image}
                    alt="Mohammed Ali"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-8">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>

                      <div
                        className="text-gray-400 leading-relaxed text-lg mb-6 space-y-4"
                        dangerouslySetInnerHTML={{
                          __html: aboutContent?.data[0].bio || "",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Expertise & Specializations
                    </h3>
                    <ul className="space-y-2">
                      {aboutContent?.data[0].expertise.map((item) => (
                        <li key={item.id} className="flex items-start gap-3 text-gray-400">
                          <span className="text-accent font-bold">•</span>
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {aboutContent?.data[0].tech_stack.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
