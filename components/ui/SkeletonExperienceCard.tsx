export default function SkeletonExperienceCard() {
  return (
    <div className="relative md:w-1/2 md:px-8 animate-pulse space-y-4">
      <div className="h-6 w-32 bg-gray-500 rounded"></div>
      <div className="h-8 w-3/4 bg-gray-600 rounded"></div>
      <div className="h-4 w-full bg-gray-500 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-500 rounded"></div>
      <div className="h-8 flex flex-wrap gap-2 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-6 w-20 bg-gray-600 rounded-full"></div>
        ))}
      </div>
    </div>
  )
}
