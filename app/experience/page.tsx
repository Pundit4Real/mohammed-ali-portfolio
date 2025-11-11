import { Navbar } from "@/components/navbar"

export default function Experience() {
  const timeline = [
    {
      year: "2025",
      title: "AI & Full-Stack Engineering",
      description: "Building AI-driven platforms and advanced automation systems.",
    },
    {
      year: "2024",
      title: "Pundit Trading Platform",
      description: "Developed a complete learning + trading ecosystem.",
    },
    {
      year: "2023–2024",
      title: "Flutter Mobile Engineering",
      description: "Built multiple mobile apps including MediBot AI.",
    },
    {
      year: "2022–2023",
      title: "Backend Engineering",
      description: "Designed scalable APIs, auth systems, and secure data flows.",
    },
    {
      year: "Level 400",
      title: "BSc Computer Science",
      description: "Deep study of algorithms, systems design, and software engineering.",
    },
  ]

  return (
    <main>
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Experience</h1>
          <p className="text-xl text-secondary mb-16">The journey that shaped my technical expertise.</p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

            <div className="space-y-12 relative">
              {timeline.map((item, index) => (
                <div key={index} className={`md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 md:px-8">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-background bg-primary transform md:-translate-x-1/2 -translate-y-1.5" />
                    <div className="ml-12 md:ml-0 bg-card border border-border rounded-lg p-8">
                      <div className="text-accent font-bold text-sm mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
