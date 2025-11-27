export default function SkeletonTestimonialCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-12 space-y-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-500 rounded"></div>
      <div className="h-8 w-full bg-gray-600 rounded"></div>
      <div className="h-6 w-1/2 bg-gray-500 rounded mt-4"></div>
      <div className="flex items-center gap-4 mt-6">
        <div className="w-16 h-16 rounded-full bg-gray-600 border border-border"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 w-3/4 bg-gray-500 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}
