"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, Github, Youtube } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactInfo = [
    { label: "Email", value: "mohammedaalli088@gmail.com", icon: Mail, href: "mailto:mohammedaalli088@gmail.com" },
    { label: "Phone", value: "+233 59 819 3277", icon: Phone, href: "tel:+233598193277" },
    { label: "GitHub", value: "github.com/pundit4real", icon: Github, href: "https://github.com/pundit4real" },
    { label: "YouTube", value: "@pundittrading", icon: Youtube, href: "https://www.youtube.com/@pundittrading" },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Contact Me</h1>
          <p className="text-xl text-secondary mb-16">Let's build something exceptional together.</p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Let's Talk</h2>
                <p className="text-gray-400 leading-relaxed">
                  Have an idea, project, or collaboration in mind? I'm open to freelance, full-time roles, or building custom systems.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ label, value, icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 group hover:text-primary transition-colors"
                  >
                    <Icon className="w-6 h-6 text-primary flex-shrink-0 group-hover:animate-pulse" />
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary ">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent animate-fade-in">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
