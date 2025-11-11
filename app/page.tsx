import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Build Something Extraordinary?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's turn your ideas into reality with cutting-edge technology and innovative solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3"
          >
            Start Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
