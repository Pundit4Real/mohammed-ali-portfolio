export default function SkeletonServiceCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-8 animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-600 rounded"></div> {/* Small heading */}
        <div className="h-10 w-full bg-gray-500 rounded"></div> {/* Main title */}
      </div>

      {/* Icon Skeleton */}
      <div className="h-12 w-12 bg-gray-600 rounded-full mt-4"></div>

      {/* Text/content skeleton */}
      <div className="space-y-2 mt-4">
        <div className="h-4 w-3/4 bg-gray-500 rounded"></div>
        <div className="h-4 w-full bg-gray-600 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-600 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-600 rounded"></div>
      </div>
    </div>
  )
}
