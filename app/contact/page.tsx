"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Linkedin, X, Send, MessageCircle } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonContactCard from "@/components/ui/SkeletonContactCard";

type ContactHeaderProps = { headline: string; subheadline: string };

type ContactInfoProps = {
  id: number;
  headline: string;
  subheadline: string;
  address: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  telegram: string;
};

type ContactDataProps = { hero: ContactHeaderProps; data: ContactInfoProps[] };

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contactContent, setContactContent] = useState<ContactDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await apiClient.get("/contact-info/");
        setContactContent(response.data);
      } catch (error) {
        console.error("Failed to load contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const backend = contactContent?.data?.[0];

  const contactInfo = [
    { label: "Email", icon: Mail, href: backend?.email ? `mailto:${backend.email}` : undefined },
    { label: "Whatsapp", icon: MessageCircle, href: backend?.phone || undefined },
    { label: "LinkedIn", icon: Linkedin, href: backend?.linkedin || undefined },
    { label: "X (Twitter)", icon: X, href: backend?.twitter || undefined },
    { label: "Telegram", icon: Send, href: backend?.telegram || undefined },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <SkeletonContactCard />
          ) : contactContent ? (
            <>
              {/* Page Header */}
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {contactContent.hero.headline}
                </h1>
                <p className="text-xl text-secondary">{contactContent.hero.subheadline}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Left: Contact Info */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">{backend?.headline}</h2>
                    <p className="text-gray-400 leading-relaxed">{backend?.subheadline}</p>
                  </div>

                  {contactInfo.map(({ label, icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 group hover:text-primary transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                        <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="font-medium text-white group-hover:text-primary text-lg">{label}</p>
                    </a>
                  ))}
                </div>

                {/* Right: Contact Form */}
                <div className="bg-card border border-border rounded-lg p-8">
                  {submitted && (
                    <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent animate-fade-in">
                      Thank you! Your message has been sent.
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
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
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
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
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
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/80 transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <p className="text-red-500">Failed to load contact info.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
