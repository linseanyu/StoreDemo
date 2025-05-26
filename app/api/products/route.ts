import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('categoryId') || ''
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const inStock = searchParams.get('inStock') === 'true'

    // Calculate skip for pagination
    const skip = (page - 1) * limit

    // Build where clause properly
    const whereConditions: Prisma.ProductWhereInput[] = []

    // Search in name and description
    if (search) {
      whereConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    // Category filter
    if (categoryId) {
      whereConditions.push({ categoryId })
    }

    // Price range filter
    whereConditions.push({
      price: {
        gte: minPrice,
        lte: maxPrice
      }
    })

    // Stock filter
    if (inStock) {
      whereConditions.push({ stock: { gt: 0 } })
    }

    const where: Prisma.ProductWhereInput = whereConditions.length > 0 
      ? { AND: whereConditions }
      : {}

    // Build orderBy clause with proper typing
    let orderBy: Prisma.ProductOrderByWithRelationInput = {}
    if (sortBy === 'price') {
      orderBy = { price: sortOrder as 'asc' | 'desc' }
    } else if (sortBy === 'name') {
      orderBy = { name: sortOrder as 'asc' | 'desc' }
    } else if (sortBy === 'rating') {
      // For rating, we'll need to handle this differently since it's calculated
      orderBy = { createdAt: 'desc' } // fallback for now
    } else {
      orderBy = { [sortBy]: sortOrder as 'asc' | 'desc' }
    }

    // Fetch products with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
      }),
      prisma.product.count({ where })
    ])

    // Calculate average rating for each product
    const productsWithRating = products.map((product) => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0
      
      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        reviews: undefined // Remove reviews array from response
      }
    })

    // Sort by rating if requested (since we can't do it in the database query easily)
    if (sortBy === 'rating') {
      productsWithRating.sort((a, b) => {
        return sortOrder === 'desc' ? b.avgRating - a.avgRating : a.avgRating - b.avgRating
      })
    }

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      products: productsWithRating,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 