import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function CartPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i}>
                  <div className="flex gap-4 p-4">
                    {/* Product Image Skeleton */}
                    <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />

                    {/* Product Details Skeleton */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                        </div>
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                      </div>

                      {/* Quantity Controls Skeleton */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < 2 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Continue Shopping Button Skeleton */}
          <div className="flex justify-start">
            <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-12 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
              </div>

              <div className="space-y-3 pt-4">
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 