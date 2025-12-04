import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <Suspense fallback={<div className="py-20 text-center text-white">Loading projects...</div>}>
        <ProjectsClient />
      </Suspense>

      <Footer />
    </main>
  );
}
