'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProductFilters } from './product-filters'
import { ProductGrid } from './product-grid'
import { ProductPagination } from './product-pagination'
import { ProductSort } from './product-sort'
import { SearchBar } from './search-bar'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

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

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

interface Filters {
  search: string
  categoryId: string
  minPrice: number
  maxPrice: number
  inStock: boolean
  sortBy: string
  sortOrder: string
}

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categoryId: '',
    minPrice: 0,
    maxPrice: 999999,
    inStock: false,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [currentPage, setCurrentPage] = useState(1)

  const fetchProducts = useCallback(async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        search: filters.search,
        categoryId: filters.categoryId,
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.inStock && { inStock: 'true' })
      })

      const response = await fetch(`/api/products?${params}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json()
      setProducts(data.products)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [
    filters.search,
    filters.categoryId,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock,
    filters.sortBy,
    filters.sortOrder
  ])

  useEffect(() => {
    fetchProducts(currentPage)
  }, [fetchProducts, currentPage])

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full mb-4"
        >
          <Filter className="w-4 h-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'}`}>
        <div className="sticky top-4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              value={filters.search}
              onChange={(search: string) => handleFilterChange({ search })}
            />
          </div>
          <div className="sm:w-48">
            <ProductSort
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortChange={(sortBy: string, sortOrder: string) => 
                handleFilterChange({ sortBy, sortOrder })
              }
            />
          </div>
        </div>

        {/* Results Info */}
        {pagination && (
          <div className="mb-6 text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{' '}
            {pagination.totalCount} products
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8">
            <ProductPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  )
} 