import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Cpu, Code, Smartphone, Shield, Cloud, Cog } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      id: "ai-model-development",
      icon: Cpu,
      title: "AI Model Development",
      description: "Custom AI systems, NLP, chatbots, and automation pipelines tailored to your business needs.",
      detail: "We build, train, and deploy AI solutions including natural language processing, intelligent chatbots, and workflow automation to optimize operations and enhance user experiences.",
    },
    {
      id: "web-development",
      icon: Code,
      title: "Web Development",
      description: "Django & FastAPI apps, dashboards, APIs, and analytics platforms.",
      detail: "Full-stack web development services creating scalable backend systems, interactive dashboards, and powerful APIs with modern frameworks like Django, FastAPI, and React.",
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      title: "Mobile Apps",
      description: "High-quality Flutter apps with clean UI/UX.",
      detail: "Cross-platform mobile applications built with Flutter, focusing on smooth performance, intuitive design, and seamless user experience for iOS and Android.",
    },
    {
      id: "blockchain-development",
      icon: Shield,
      title: "Blockchain Development",
      description: "Smart contracts, DID systems, decentralized applications.",
      detail: "Secure and decentralized solutions using blockchain technology, including smart contracts, decentralized identity (DID) systems, and Web3 integrations.",
    },
    {
      id: "cloud-deployment",
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Docker, CI/CD, AWS hosting, and scalable backends.",
      detail: "End-to-end cloud solutions with containerization, CI/CD pipelines, AWS deployment, and scalable backend architectures to ensure reliability and performance.",
    },
    {
      id: "automation-tools",
      icon: Cog,
      title: "Automation Tools",
      description: "Bots, scrapers, workflow automation, and integrations.",
      detail: "Custom automation scripts, scrapers, and integration tools designed to streamline repetitive tasks and boost productivity across platforms.",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4 bg-gradient-to-b from-background to-background/90">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Services</h1>
          <p className="text-xl text-secondary mb-16">
            I help businesses deploy high-performance digital solutions with AI, web, mobile, and automation technologies.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`} // optional: detail page for each service
                  className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                >
                  <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
