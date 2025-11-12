import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const skills = [
    "Python",
    "Django",
    "FastAPI",
    "Flutter",
    "Dart",
    "PostgreSQL",
    "Docker",
    "AWS",
    "LangChain",
    "Google Gemini",
    "Solidity",
    "Redis",
    "React",
  ]

  const education = [
    "BSc Computer Science (Level 400)",
    "AI/ML & Automation Systems",
    "Flutter Mobile Development",
    "Blockchain & Decentralized Identity",
    "API Design & Cloud Deployment",
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About Me</h1>
          <p className="text-xl text-secondary mb-16">Get to know the person behind the code.</p>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/diverse-person-portrait.png"
                alt="Mohammed Ali"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>
                <p className="text-gray-400 leading-relaxed text-lg mb-6">
                  I'm Mohammed Ali, a Software Engineer and AI Solutions Architect with strong experience in building
                  full-stack platforms, AI-powered systems, blockchain applications, automation workflows, and
                  cloud-ready infrastructure.
                </p>
                <p className="text-gray-400 leading-relaxed text-lg">
                  I specialize in transforming ideas into advanced, scalable products that drive business value and user
                  engagement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Expertise & Specializations</h3>
                <ul className="space-y-2">
                  {education.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  {skill}
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
