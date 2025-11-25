"use client"

import React from "react"

type SkeletonGridProps = {
  showImage?: boolean         // show main image
  showThumbnails?: boolean    // show thumbnail carousel
  showContent?: boolean       // show content grid
  showTechStack?: boolean     // show tech stack badges
}

export default function SkeletonGrid({
  showImage = true,
  showThumbnails = true,
  showContent = true,
  showTechStack = true,
}: SkeletonGridProps) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="h-8 w-32 bg-gray-600 animate-pulse rounded"></div>
      <div className="h-12 bg-gray-500 animate-pulse rounded"></div>

      {/* Main Image */}
      {showImage && (
        <div className="h-96 bg-gray-500 animate-pulse rounded-lg w-full"></div>
      )}

      {/* Thumbnails Carousel */}
      {showThumbnails && (
        <div className="flex gap-2 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-40 h-24 bg-gray-500 animate-pulse rounded-lg flex-shrink-0"
            ></div>
          ))}
        </div>
      )}

      {/* Content Grid */}
      {showContent && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="h-6 w-32 bg-gray-500 animate-pulse rounded"></div>
            <div className="h-24 bg-gray-500 animate-pulse rounded"></div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gray-500 animate-pulse rounded w-full"
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {showTechStack && (
        <div className="flex flex-wrap gap-3 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-500 animate-pulse rounded"
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}
