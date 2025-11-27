"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";

type ServiceDetailType = {
  id: string;
  title: string;
  description: string;
  full_description: string;
  tech_stack: string[];
  url?: string;
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params.id;
  
  const [service, setService] = useState<ServiceDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/services/${serviceId}/`);
        setService(response.data);
        console.log("Fetched service:", response.data);
      } catch (err: any) {
        console.error("Failed to load service:", err);
        setError("Failed to load service. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 py-20 px-4">
          <div className="max-w-7xl mx-auto text-white text-xl">Loading service...</div>
        </section>
        <Footer />
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 py-20 px-4">
          <div className="max-w-7xl mx-auto text-red-500 text-xl">{error || "Service not found."}</div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/services" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8">
            <ChevronLeft size={20} /> Back to Services
          </Link>

          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-gray-400 mb-6">{service.description}</p>
            <p className="text-gray-400 mb-6">{service.full_description}</p>

            {service.tech_stack && (
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tech_stack.map((tech, i) => (
                  <Badge key={i} className="bg-primary/20 border border-primary/50 text-primary">{tech}</Badge>
                ))}
              </div>
            )}

            {service.url ? (
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Visit Service
              </a>
            ) : (
              <p className="text-gray-400 italic">More info about this service will be available soon.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
