import { Suspense } from 'react'
import { CategoriesGrid } from '@/components/categories/categories-grid'
import { CategoriesGridSkeleton } from '@/components/categories/categories-grid-skeleton'

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Browse products by category to find exactly what you're looking for</p>
      </div>
      
      <Suspense fallback={<CategoriesGridSkeleton />}>
        <CategoriesGrid />
      </Suspense>
    </div>
  )
} 