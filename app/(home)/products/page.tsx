import { Suspense } from 'react'
import { ProductCatalog } from '@/components/products/product-catalog'
import { ProductCatalogSkeleton } from '@/components/products/product-catalog-skeleton'

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Discover our amazing collection of products</p>
      </div>
      
      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog />
      </Suspense>
    </div>
  )
} 