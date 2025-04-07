// PostSkeleton.tsx
import React from 'react'

function PostSkeleton() {
  return (
    <div className="p-4 border-y-[1px] border-gray-700 ml-4 animate-pulse">
      {/* Header (icon + username) */}
      <div className="flex items-center gap-2 text-sm mb-2 font-bold">
        <div className="w-5 h-5 bg-gray-700 rounded-full" />
        <div className="w-24 h-4 bg-gray-700 rounded" />
      </div>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-700" />

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Top row (name, timestamp, options) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-20 h-5 bg-gray-700 rounded" />
              <div className="w-16 h-4 bg-gray-700 rounded" />
              <div className="w-24 h-4 bg-gray-700 rounded" />
            </div>
            <div className="w-32 h-4 bg-gray-700 rounded" />
            <div className="w-6 h-6 bg-gray-700 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-700 rounded" />
            <div className="w-5/6 h-4 bg-gray-700 rounded" />
            <div className="w-3/4 h-4 bg-gray-700 rounded" />
          </div>

          {/* Image placeholder */}
          <div className="mt-2 w-full h-48 bg-gray-700 rounded-lg" />

          {/* Location / Date lines */}
          <div className="mt-2 space-y-1">
            <div className="w-1/2 h-3 bg-gray-700 rounded" />
            <div className="w-1/3 h-3 bg-gray-700 rounded" />
          </div>

          {/* Interaction buttons */}
          <div className="mt-3 flex gap-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full" />
            <div className="w-8 h-8 bg-gray-700 rounded-full" />
            <div className="w-8 h-8 bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton
