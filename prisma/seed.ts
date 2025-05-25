import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Electronics' },
      update: {},
      create: {
        name: 'Electronics',
        description: 'Latest technology and electronic devices',
        image: '/images/c-electronics.jpg'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Clothing' },
      update: {},
      create: {
        name: 'Clothing',
        description: 'Fashion and apparel for everyone',
        image: '/images/c-tshirts.jpg'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Shoes' },
      update: {},
      create: {
        name: 'Shoes',
        description: 'Comfortable and stylish footwear',
        image: '/images/c-shoes.jpg'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Jeans' },
      update: {},
      create: {
        name: 'Jeans',
        description: 'Premium denim and casual wear',
        image: '/images/c-jeans.jpg'
      }
    })
  ])

  // Clear existing products first (optional - remove if you want to keep existing data)
  await prisma.product.deleteMany({})

  // Sample products data
  const products = [
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
      price: 89.99,
      images: ['/images/p11-1.jpg', '/images/p11-2.jpg'],
      stock: 25,
      categoryId: categories[0].id // Electronics
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity. Track your health goals effortlessly.',
      price: 199.99,
      images: ['/images/p12-1.jpg', '/images/p12-2.jpg'],
      stock: 15,
      categoryId: categories[0].id // Electronics
    },
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Soft and comfortable 100% cotton t-shirt available in multiple colors. Perfect for everyday wear with a relaxed fit.',
      price: 24.99,
      images: ['/images/p21-1.jpg', '/images/p21-2.jpg'],
      stock: 50,
      categoryId: categories[1].id // Clothing
    },
    {
      name: 'Casual Button-Up Shirt',
      description: 'Stylish and versatile button-up shirt suitable for both casual and semi-formal occasions. Made from breathable fabric.',
      price: 39.99,
      images: ['/images/p22-1.jpg', '/images/p22-2.jpg'],
      stock: 30,
      categoryId: categories[1].id // Clothing
    },
    {
      name: 'Running Sneakers',
      description: 'Lightweight and comfortable running shoes with advanced cushioning technology. Perfect for daily workouts and marathons.',
      price: 79.99,
      images: ['/images/p31-1.jpg', '/images/p31-2.jpg'],
      stock: 20,
      categoryId: categories[2].id // Shoes
    },
    {
      name: 'Classic Leather Boots',
      description: 'Handcrafted leather boots with premium materials and timeless design. Durable and perfect for any season.',
      price: 149.99,
      images: ['/images/p32-1.jpg', '/images/p32-2.jpg'],
      stock: 12,
      categoryId: categories[2].id // Shoes
    }
  ]

  // Create products
  const createdProducts = await Promise.all(
    products.map(productData =>
      prisma.product.create({
        data: productData
      })
    )
  )

  console.log('Database seeded successfully!')
  console.log(`Created ${categories.length} categories and ${createdProducts.length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 