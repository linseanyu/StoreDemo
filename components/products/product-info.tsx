'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Plus, Minus, Heart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/stores/cart-store'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: {
    name: string
  }
  avgRating: number
  reviewCount: number
  images: string[]
}

interface ProductInfoProps {
  product: Product
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? 'fill-yellow-400 text-yellow-400'
          : i < rating
          ? 'fill-yellow-400/50 text-yellow-400'
          : 'text-gray-300'
      }`}
    />
  ))
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { addItem, openCart, isItemInCart, getItemQuantity } = useCartStore()
  const itemInCart = isItemInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder-product.jpg',
        stock: product.stock,
        category: product.category
      }
      
      addItem(cartItem, quantity)
      
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`, {
        action: {
          label: 'View Cart',
          onClick: () => openCart()
        }
      })
      
      // Reset quantity to 1 after adding
      setQuantity(1)
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5
  const maxQuantity = Math.max(0, product.stock - cartQuantity)

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <Badge variant="outline" className="w-fit">
        {product.category.name}
      </Badge>

      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {renderStars(product.avgRating)}
          </div>
          <span className="text-sm text-gray-600">
            {product.avgRating > 0 
              ? `${product.avgRating} (${product.reviewCount} ${product.reviewCount === 1 ? 'review' : 'reviews'})`
              : 'No reviews yet'
            }
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-3xl font-bold text-primary">
        {formatPrice(product.price)}
      </div>

      {/* Stock Status */}
      <div className="space-y-2">
        {isOutOfStock ? (
          <Badge variant="destructive">Out of Stock</Badge>
        ) : isLowStock ? (
          <Badge variant="secondary">Only {product.stock} left in stock</Badge>
        ) : (
          <Badge variant="default" className="bg-green-100 text-green-800">
            In Stock ({product.stock} available)
          </Badge>
        )}
        
        {/* Cart Status */}
        {itemInCart && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Check className="w-3 h-3 mr-1" />
            {cartQuantity} in cart
          </Badge>
        )}
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      <Separator />

      {/* Quantity and Add to Cart */}
      {!isOutOfStock && maxQuantity > 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= maxQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {maxQuantity < product.stock && (
              <p className="text-sm text-amber-600 mt-1">
                {cartQuantity} already in cart. {maxQuantity} more available.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || quantity > maxQuantity}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
            
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Out of Stock or Max Quantity Reached */}
      {(isOutOfStock || maxQuantity === 0) && (
        <div className="space-y-4">
          <Button disabled className="w-full" size="lg">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Maximum Quantity in Cart'}
          </Button>
          {maxQuantity === 0 && !isOutOfStock && (
            <p className="text-sm text-gray-600 text-center">
              You have the maximum available quantity ({cartQuantity}) in your cart.
            </p>
          )}
        </div>
      )}

      {/* Product Details */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>SKU:</span>
          <span className="font-mono">{product.id.slice(-8).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span>Category:</span>
          <span>{product.category.name}</span>
        </div>
      </div>
    </div>
  )
} 