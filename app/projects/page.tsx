import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <ProjectsClient />
      <Footer />
    </main>
  );
}
