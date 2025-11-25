"use client";

export default function SkeletonHero() {
  return (
    <div className="max-w-7xl mx-auto px-4 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 w-full">
          {/* Name */}
          <div className="h-16 w-full max-w-[480px] bg-gray-600 rounded"></div>
          {/* Title */}
          <div className="h-8 w-full max-w-[360px] bg-gray-500 rounded"></div>
          {/* Description */}
          <div className="h-6 w-full max-w-[640px] bg-gray-500 rounded"></div>
          {/* Rotating Keyword */}
          <div className="h-10 w-full max-w-[192px] bg-gray-600 rounded"></div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="h-12 w-full max-w-[144px] bg-gray-600 rounded"></div>
            <div className="h-12 w-full max-w-[144px] bg-gray-500 rounded"></div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:flex justify-center">
          <div className="w-80 h-80 rounded-full border-4 border-gray-600/50 flex items-center justify-center bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
