"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ExternalLink } from "lucide-react";
import apiClient from "@/utils/apiClient";
import SkeletonServiceCard from "@/components/ui/SkeletonServiceCard";

type CategoryType = {
  id: number;
  name: string;
};

type ServiceDetailType = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  categories: CategoryType[];
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
      } catch (err: any) {
        setError("Failed to load service. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 py-20 px-4 bg-gradient-to-b from-background to-background/90">
        <div className="max-w-7xl mx-auto">
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonServiceCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="text-red-500 text-xl">{error}</p>
          )}

          {/* Service Content */}
          {!loading && !error && service && (
            <>
              <Link
                href="/services"
                className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
              >
                <ChevronLeft size={20} />
                Back to Services
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT PANEL */}
                <div className="md:col-span-2 bg-card border border-border rounded-2xl p-10 shadow-xl">
                  <h1 className="text-4xl font-extrabold text-white mb-4">
                    {service.title}
                  </h1>

                  <div
                    className="text-gray-300 text-lg leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>

                {/* RIGHT PANEL */}
                <div className="space-y-6">
                  {/* Categories */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-3">
                      Projects From this Service
                    </h2>

                    {service.categories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/projects?categories=${cat.id}`}
                          >
                            <Badge className="bg-secondary/20 border border-secondary/40 text-secondary cursor-pointer hover:bg-secondary/30">
                              {cat.name}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No categories assigned.</p>
                    )}

                    {service.url && (
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex text-primary items-center gap-2 text-sm hover:text-primary/70 transition-colors"
                      >
                        Live Project
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>

                  {/* Enquiry / Hire */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-3">
                      Need This Service?
                    </h2>

                    <Link
                      href={`/contact?service=${service.id}`}
                      className="flex items-center justify-between bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-all"
                    >
                      Hire Me
                      <ChevronLeft size={18} className="rotate-180 opacity-90" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
