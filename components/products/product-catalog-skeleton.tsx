export function ProductCatalogSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <aside className="lg:w-64">
        <div className="space-y-6">
          {/* Filters Header */}
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          
          {/* Categories Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
            </div>
          </div>
          
          {/* Stock Filter Card */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1">
        {/* Search and Sort Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="sm:w-48">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 