import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

type RouteParams = Promise<{ id: string }>

interface RouteContext {
  params: RouteParams
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
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

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0

    const productWithRating = {
      ...product,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length,
      reviews: undefined // Remove reviews array from response
    }

    return NextResponse.json(productWithRating)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
} 