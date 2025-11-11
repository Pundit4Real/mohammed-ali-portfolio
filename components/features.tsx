import { Cpu, Code, Smartphone } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Cpu,
      title: "AI Systems",
      description: "Custom models, NLP, automation bots, and intelligent pipelines.",
    },
    {
      icon: Code,
      title: "Full-Stack Engineering",
      description: "High-performance APIs, dashboards, and cloud-native solutions.",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Flutter apps optimized for speed, elegance, and usability.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">What I Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
