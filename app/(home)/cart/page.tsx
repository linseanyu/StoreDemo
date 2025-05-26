import { Suspense } from 'react'
import { CartPage } from '@/components/cart/cart-page'
import { CartPageSkeleton } from '@/components/cart/cart-page-skeleton'

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<CartPageSkeleton />}>
        <CartPage />
      </Suspense>
    </div>
  )
} 