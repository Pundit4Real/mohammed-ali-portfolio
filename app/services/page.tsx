"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Cpu, Code, Smartphone, Shield, Cloud, Cog, ChartCandlestick } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

type ServicesHeaderProps = {
  headline: string;
  subheadline: string;
};

type ServicesContentProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  price?: string;
  highlight?: boolean;
  is_active?: boolean;
};

type ServicesDataProps = {
  hero: ServicesHeaderProps;
  data: ServicesContentProps[];
};

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

        // Filter active services
        const activeServices: ServicesContentProps[] = response.data.data.filter(
          (service: ServicesContentProps) => service.is_active === true
        );

        setServicesContent({
          hero: response.data.hero,
          data: activeServices,
        });
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
          {loading && <p className="text-white text-xl">Loading services...</p>}
          {error && <p className="text-red-500 text-xl">{error}</p>}

          {!loading && !error && servicesContent && (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {servicesContent.hero.headline}
              </h1>
              <p className="text-xl text-secondary mb-16">
                {servicesContent.hero.subheadline}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesContent.data.map((service) => {
                  const Icon = iconMap[service.slug] || Code;

                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                    >
                      <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400">{service.description}</p>
                    </Link>
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
