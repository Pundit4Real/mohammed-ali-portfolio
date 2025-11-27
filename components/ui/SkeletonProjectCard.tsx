"use client"

export default function SkeletonProjectCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full animate-pulse">
      <div className="h-48 bg-gray-600 rounded-t-lg mb-4"></div>
      <div className="p-6 space-y-2">
        <div className="h-5 w-3/4 bg-gray-500 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-500 rounded"></div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="h-4 w-10 bg-gray-500 rounded"></div>
          <div className="h-4 w-10 bg-gray-500 rounded"></div>
          <div className="h-4 w-10 bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  )
}
