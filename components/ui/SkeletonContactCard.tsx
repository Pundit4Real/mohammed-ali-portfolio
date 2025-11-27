"use client";

export default function SkeletonContactCard() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="h-8 w-48 bg-gray-600 rounded mx-auto"></div>
        <div className="h-4 w-3/4 bg-gray-500 rounded mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-600" />
              <div className="h-4 w-32 bg-gray-500 rounded" />
            </div>
          ))}
        </div>

        {/* Right: Form */}
        <div className="space-y-4 bg-card border border-border rounded-lg p-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-600 rounded w-full" />
          ))}
          <div className="h-24 bg-gray-500 rounded w-full mt-2" />
          <div className="h-12 bg-gray-600 rounded w-full mt-4" />
        </div>
      </div>
    </div>
  );
}
