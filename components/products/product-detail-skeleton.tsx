import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2">
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />

          {/* Title and Rating */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
          </div>

          {/* Price */}
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />

          {/* Stock Status */}
          <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-28 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center space-y-2">
              <div className="h-12 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                  <div className="flex-1 h-2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-4 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Products Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 