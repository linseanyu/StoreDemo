'use client'

import { ProductCard } from '@/components/ui/product-card'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  categoryId: string
  category: {
    name: string
  }
  avgRating: number
  reviewCount: number
}

interface ProductGridProps {
  products: Product[]
  loading: boolean
}

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No products found</div>
        <div className="text-gray-400 text-sm">
          Try adjusting your filters or search terms
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
} 