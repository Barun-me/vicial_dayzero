// SearchSectionSkeleton.tsx
import React from 'react'

const SearchSectionSkeleton: React.FC = () => {
  return (
    <div className="p-3 md:p-6 border-2 rounded-xl flex flex-col gap-4 bg-white border-black animate-pulse">
      {/* Title placeholder */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="w-32 h-6 bg-gray-300 rounded" />
      </div>

      {/* Two autocomplete placeholders */}
      {[0, 1].map((_, i) => (
        <div key={i} className="flex items-center gap-4 relative">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="flex-1 h-10 bg-gray-300 rounded" />
        </div>
      ))}

      {/* Button placeholder */}
      <div className="mt-5 w-full h-12 bg-gray-300 rounded-lg" />
    </div>
  )
}

export default SearchSectionSkeleton
