"use client";

import apiClient from "@/utils/apiClient";
import { Cpu, Code, Smartphone, Shield, Cog, ChartCandlestick } from "lucide-react";
import { useEffect, useState } from "react";

type ServicesContentProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  price?: string;
  highlight: boolean;
};

type ServicesDataProps = {
  data: ServicesContentProps[];
};

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "web-development": Code,
  "mobile-apps-development": Smartphone,
  "blockchain-development": Shield,
  "crypto-forex-trading-mentor": ChartCandlestick,
  "ai-models-systems-development": Cog,
};

export function Features() {
  const [servicesContent, setServicesContent] = useState<ServicesDataProps | null>(null);

  useEffect(() => {
    const fetchHighlightedServices = async () => {
      try {
        const response = await apiClient.get("/services/?highlight=true");

        const highlighted = response.data.data.filter(
          (service: ServicesContentProps) => service.highlight === true
        );

        setServicesContent({ ...response.data, data: highlighted });
      } catch (error) {
        console.error("Failed to load highlighted services:", error);
      }
    };

    fetchHighlightedServices();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">What I Do</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesContent?.data.map((service) => {
            const Icon = iconMap[service.slug] || Code;

            return (
              <div
                key={service.id}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p
                  className="text-gray-400"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
