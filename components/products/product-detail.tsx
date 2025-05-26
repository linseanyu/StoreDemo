'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { ProductImageGallery } from './product-image-gallery'
import { ProductInfo } from './product-info'
import { ProductReviews } from './product-reviews'
import { RelatedProducts } from './related-products'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  categoryId: string
  category: {
    id: string
    name: string
  }
  avgRating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${productId}`)
        
        if (response.status === 404) {
          notFound()
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return <div>Loading...</div> // This will be replaced by the skeleton
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">Error loading product</div>
        <div className="text-gray-400 text-sm">{error}</div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?categoryId=${product.category.id}`}>
              {product.category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ProductImageGallery images={product.images} productName={product.name} />
        
        {/* Product Information */}
        <ProductInfo product={product} />
      </div>

      {/* Reviews Section */}
      <ProductReviews productId={product.id} />

      {/* Related Products */}
      <RelatedProducts 
        categoryId={product.category.id} 
        currentProductId={product.id}
        categoryName={product.category.name}
      />
    </div>
  )
} 