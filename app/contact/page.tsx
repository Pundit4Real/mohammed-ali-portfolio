"use client";

import React, { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Linkedin, X, Send, MessageCircle } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonContactCard from "@/components/ui/SkeletonContactCard";
import { useSearchParams } from "next/navigation";

type ContactHeaderProps = { headline: string; subheadline: string };

type ContactInfoProps = {
  id: string;
  headline?: string;
  subheadline?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
};

type ServicesContentProps = {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
};

type ContactDataProps = {
  hero: ContactHeaderProps;
  data: ContactInfoProps[];
};

export default function Contact() {

  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: searchParams.get("service") || "",
  });

  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [contactContent, setContactContent] = useState<ContactDataProps | null>(null);
  const [services, setServices] = useState<ServicesContentProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Ref to scroll to top of section (below header)
  const heroRef = useRef<HTMLDivElement>(null);

  // Fetch contact info + active services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const contactResponse = await apiClient.get("/contact-info/");
        setContactContent(contactResponse.data);

        const servicesResponse = await apiClient.get("/services/?is_active=true");
        const activeServices: ServicesContentProps[] = servicesResponse.data.data.filter(
          (s: ServicesContentProps) => s.is_active
        );
        setServices(activeServices);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setBannerMessage("Failed to load contact info. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showBanner = (message: string) => {
    setBannerMessage(message);
    setTimeout(() => setBannerMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingForm(true);
    try {
      await apiClient.post("/contact-messages/", {
        service: formData.service,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        views: 0,
        is_active: true,
        responded: false,
        response_message: "",
      });

      setFormData({ name: "", email: "", message: "", service: "" });

      // Scroll up to hero section before showing banner
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      // Wait a tiny bit to ensure scrolling starts before showing banner
      setTimeout(() => showBanner("Thank you! Your message has been sent."), 500);
    } catch (err: any) {
      console.error("Failed to send message:", err);

      // Scroll up as well on error
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => showBanner("Something went wrong. Please try again."), 500);
    } finally {
      setLoadingForm(false);
    }
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
    <main className="min-h-screen flex flex-col relative">
      <Navbar />

      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <SkeletonContactCard />
          ) : contactContent ? (
            <>
              {/* Hero / headline section ref */}
              <div ref={heroRef} className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {contactContent.hero.headline}
                </h1>
                <p className="text-xl text-secondary">{contactContent.hero.subheadline}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
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

                <div className="bg-card border border-border rounded-lg p-8">
                  {/* Banner above form */}
                  {bannerMessage && (
                    <div className="mb-4 p-4 bg-accent/10 border border-accent text-accent rounded-lg text-center animate-slideDown">
                      {bannerMessage}
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
                      <label className="block text-sm font-medium text-foreground mb-2">Select Service</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground"
                      >
                        <option value="">Choose a service...</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
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
                      disabled={loadingForm}
                      className={`w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center ${
                        loadingForm ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/80"
                      }`}
                    >
                      {loadingForm ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                      ) : null}
                      {loadingForm ? "Sending..." : "Send Message"}
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
