export function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}

function CategoryCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      {/* Icon placeholder */}
      <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse" />
      
      {/* Content */}
      <div className="text-center space-y-2">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
        
        {/* Description */}
        <div className="space-y-1">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto animate-pulse" />
        </div>
        
        {/* Product count */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
    </div>
  )
} 