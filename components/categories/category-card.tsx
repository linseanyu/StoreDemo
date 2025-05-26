import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  description?: string
  _count: {
    products: number
  }
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
          <Package className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          
          {category.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
          
          <div className="text-sm text-muted-foreground">
            {category._count.products} {category._count.products === 1 ? 'product' : 'products'}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/products?categoryId=${category.id}`}>
            Browse Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 