"use client"; // MUST be the first line

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/utils/apiClient";
import SkeletonProjectCard from "@/components/ui/SkeletonProjectCard";

type ProjectHeaderProps = {
  headline: string;
  subheadline: string;
};

type ProjectContentProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: Array<{ id?: number; name?: string }>;
  tech_stack: string[];
  tags: string | string[];
  github_link: string;
  live_demo: string;
  live_link: string;
  images: Array<{ id: number; image: string }>;
};

type ProjectDataProps = {
  hero: ProjectHeaderProps;
  data: ProjectContentProps[];
};

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categories");
  const categoryName = searchParams.get("category_name");
  const categoryContains = searchParams.get("category_name_icontains");

  const [activeFilter, setActiveFilter] = useState("All");
  const [projectsContent, setProjectContent] = useState<ProjectDataProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        let url = "/projects/";
        const query: string[] = [];
        if (categoryId) query.push(`categories=${categoryId}`);
        if (categoryName) query.push(`category_name=${categoryName}`);
        if (categoryContains) query.push(`category_name_icontains=${categoryContains}`);
        if (query.length) url += `?${query.join("&")}`;

        const response = await apiClient.get(url);
        setProjectContent(response.data);

        if (categoryName) setActiveFilter(categoryName);
        else if (categoryId) {
          const found = response.data.data
            ?.flatMap((p: any) => p.categories)
            ?.find((c: any) => String(c?.id) === String(categoryId));
          if (found?.name) setActiveFilter(found.name);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, categoryName, categoryContains]);

  // Dynamic filter buttons
  const dynamicFilters = ["All"];
  projectsContent?.data?.forEach((project) =>
    project.categories?.forEach((c) => c?.name && dynamicFilters.push(c.name))
  );

  const filteredProjects =
    activeFilter === "All"
      ? projectsContent?.data || []
      : projectsContent?.data.filter((p) =>
          p.categories?.some((c) => c.name === activeFilter)
        ) || [];

  return (
    <section className="flex-1 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProjectCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {projectsContent?.hero.headline}
            </h1>
            <p className="text-xl text-secondary mb-12">
              {projectsContent?.hero.subheadline}
            </p>

            {(categoryId || categoryName || categoryContains) && (
              <p className="mb-6 text-primary text-lg">Showing filtered results...</p>
            )}

            <div className="flex flex-wrap gap-3 mb-16">
              {Array.from(new Set(dynamicFilters)).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "border border-border text-gray-400 hover:border-primary/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer h-full">
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <img
                        src={project.images?.[0]?.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-400">{project.subtitle}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.categories?.map((cat, i) => (
                          <Badge key={i} variant="outline" className="border-secondary/50 text-secondary text-xs">
                            {cat.name}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.tags) ? project.tags : project.tags?.split(","))?.filter(Boolean).map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
