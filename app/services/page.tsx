// services/page.tsx
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Cpu, Code, Smartphone, Shield, Cloud, Cog, ChartCandlestick } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";
import SkeletonServiceCard from "@/components/ui/SkeletonServiceCard";

type ServicesHeaderProps = { headline: string; subheadline: string; };
type ServicesContentProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  price?: string;
  highlight?: boolean;
  is_active?: boolean;
  url?: string;
};
type ServicesDataProps = { hero: ServicesHeaderProps; data: ServicesContentProps[]; };

// Map backend icon slugs to local icons
const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "ai-models-development": Cpu,
  "web-development": Code,
  "mobile-apps-development": Smartphone,
  "blockchain-development": Shield,
  "cloud-development": Cloud,
  "automation-tools": Cog,
  "ai-models-systems-development": Cog,
  "crypto-forex-trading-mentor": ChartCandlestick,
};

export default function Services() {
  const [servicesContent, setServicesContent] = useState<ServicesDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/services/?is_active=true");
        const activeServices = response.data.data.filter((s: ServicesContentProps) => s.is_active);
        setServicesContent({ hero: response.data.hero, data: activeServices });
        console.log("Fetched services:", activeServices);
      } catch (err: any) {
        console.error("Failed to load services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-4 bg-gradient-to-b from-background to-background/90">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonServiceCard key={i} />)}
            </div>
          )}

          {error && <p className="text-red-500 text-xl">{error}</p>}

          {!loading && !error && servicesContent && (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{servicesContent.hero.headline}</h1>
              <p className="text-xl text-secondary mb-16">{servicesContent.hero.subheadline}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesContent.data.map((service) => {
                  const Icon = iconMap[service.slug] || Code;
                  return (
                    <div
                      key={service.id}
                      className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 flex flex-col justify-between"
                    >
                      <div>
                        <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-gray-400">{service.description}</p>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all"
                        >
                          Hire Me
                        </Link>

                        {service.url ? (
                          <a
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary px-6 py-2 rounded-lg font-semibold hover:bg-secondary/10 transition-all"
                          >
                            Check It Out
                          </a>
                        ) : (
                          <Link
                            href={`services/${service.id}/`}
                            className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary px-6 py-2 rounded-lg font-semibold hover:bg-secondary/10 transition-all"
                          >
                            Check It Out
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
