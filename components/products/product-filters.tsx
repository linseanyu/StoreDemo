'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface Category {
  id: string
  name: string
  _count: {
    products: number
  }
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

interface ProductFiltersProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setPriceRange([filters.minPrice, filters.maxPrice])
  }, [filters.minPrice, filters.maxPrice])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({ 
      categoryId: filters.categoryId === categoryId ? '' : categoryId 
    })
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
  }

  const handlePriceRangeCommit = (values: number[]) => {
    onFilterChange({
      minPrice: values[0],
      maxPrice: values[1]
    })
  }

  const handleStockChange = (checked: boolean) => {
    onFilterChange({ inStock: checked })
  }

  const clearFilters = () => {
    onFilterChange({
      categoryId: '',
      minPrice: 0,
      maxPrice: 999999,
      inStock: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categoryId === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category.name}
                  <span className="text-gray-500 ml-1">
                    ({category._count.products})
                  </span>
                </Label>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="minPrice" className="text-xs text-gray-500">
                Min
              </Label>
              <Input
                id="minPrice"
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0
                  const newRange = [value, priceRange[1]]
                  setPriceRange(newRange)
                  handlePriceRangeCommit(newRange)
                }}
                className="h-8"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="maxPrice" className="text-xs text-gray-500">
                Max
              </Label>
              <Input
                id="maxPrice"
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 999999
                  const newRange = [priceRange[0], value]
                  setPriceRange(newRange)
                  handlePriceRangeCommit(newRange)
                }}
                className="h-8"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={handleStockChange}
            />
            <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 