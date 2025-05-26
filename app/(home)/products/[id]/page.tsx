import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/product-detail'
import { ProductDetailSkeleton } from '@/components/products/product-detail-skeleton'

type PageParams = Promise<{ id: string }>

interface ProductPageProps {
  params: PageParams
}

export default async function ProductPage(props: ProductPageProps) {
  const { id } = await props.params

  // Validate that id is a valid format (you might want to add more validation)
  if (!id || typeof id !== 'string') {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail productId={id} />
      </Suspense>
    </div>
  )
} 