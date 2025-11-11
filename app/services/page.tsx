import { Navbar } from "@/components/navbar"
import { Cpu, Code, Smartphone, Shield, Cloud, Cog } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Cpu,
      title: "AI Model Development",
      description: "Custom AI systems, NLP, chatbots, automation pipelines.",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Django & FastAPI apps, dashboards, APIs, analytics platforms.",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "High-quality Flutter apps with clean UI/UX.",
    },
    {
      icon: Shield,
      title: "Blockchain Development",
      description: "Smart contracts, DID systems, decentralized applications.",
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Docker, CI/CD, AWS hosting, scalable backends.",
    },
    {
      icon: Cog,
      title: "Automation Tools",
      description: "Bots, scrapers, workflow automation, integrations.",
    },
  ]

  return (
    <main>
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Services</h1>
          <p className="text-xl text-secondary mb-16">I help businesses deploy high-performance digital solutions.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
