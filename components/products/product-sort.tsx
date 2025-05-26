'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductSortProps {
  sortBy: string
  sortOrder: string
  onSortChange: (sortBy: string, sortOrder: string) => void
}

const sortOptions = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'rating-asc', label: 'Lowest Rated' },
]

export function ProductSort({ sortBy, sortOrder, onSortChange }: ProductSortProps) {
  const currentValue = `${sortBy}-${sortOrder}`

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-')
    onSortChange(newSortBy, newSortOrder)
  }

  return (
    <Select value={currentValue} onValueChange={handleSortChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 