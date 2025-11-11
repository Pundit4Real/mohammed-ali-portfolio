"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { useState } from "react"
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
    { label: "Email", value: "youremail@example.com", icon: Mail },
    { label: "Phone", value: "+233 XXX XXX XXX", icon: Phone },
    { label: "GitHub", value: "github.com/yourhandle", icon: Github },
    { label: "YouTube", value: "@TalesHiveMedia", icon: Youtube },
  ]

  return (
    <main>
      <Navbar />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Contact Me</h1>
          <p className="text-xl text-secondary mb-16">Let's build something exceptional together.</p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Let's Talk</h2>
                <p className="text-gray-400 leading-relaxed">
                  Have an idea, project, or collaboration in mind? I'm open to freelance, full-time roles, or building
                  custom systems.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map(({ label, value, icon: Icon }, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent">
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
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary"
                    placeholder="John Doe"
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
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary"
                    placeholder="john@example.com"
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
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell me about your project..."
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
    </main>
  )
}
