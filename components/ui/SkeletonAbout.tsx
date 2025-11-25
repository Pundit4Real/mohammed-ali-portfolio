export default function SkeletonAbout() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 w-3/5 bg-gray-500 rounded"></div>
      <div className="h-6 w-2/3 bg-gray-600 rounded"></div>

      <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
        <div className="h-96 bg-gray-700 rounded-lg"></div>
        <div className="space-y-6">
          <div className="h-8 w-1/2 bg-gray-500 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-600 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-600 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-600 rounded"></div>
        ))}
      </div>
    </div>
  )
}
