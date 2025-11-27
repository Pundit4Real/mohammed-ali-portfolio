import ProjectDetailClient from "./ProjectDetailClient"

export default async function ProjectDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // unwrap params if it's a Promise
  const unwrappedParams = await params
  return <ProjectDetailClient projectId={unwrappedParams.id} />
}
