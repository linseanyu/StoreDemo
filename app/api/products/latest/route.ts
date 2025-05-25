import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

type ProductWithReviews = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  categoryId: string
  createdAt: Date
  updatedAt: Date
  category: {
    name: string
  }
  reviews: {
    rating: number
  }[]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '8')

    const products = await prisma.product.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: {
          select: {
            name: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    // Calculate average rating for each product
    const productsWithRating = products.map((product: ProductWithReviews) => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / product.reviews.length
        : 0
      
      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        reviews: undefined // Remove reviews array from response
      }
    })

    return NextResponse.json(productsWithRating)
  } catch (error) {
    console.error('Error fetching latest products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 