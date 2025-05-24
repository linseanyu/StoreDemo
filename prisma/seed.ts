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
      where: { name: 'T-shirts' },
      update: {},
      create: {
        name: 'T-shirts',
        description: 'Comfortable and stylish t-shirts for everyday wear',
        image: '/images/tshirt.jpg',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Jeans' },
      update: {},
      create: {
        name: 'Jeans',
        description: 'Classic and modern jeans for all occasions',
        image: '/images/jeans.jpg',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Shoes' },
      update: {},
      create: {
        name: 'Shoes',
        description: 'Trendy and comfortable shoes for every style',
        image: '/images/shoes.jpg',
      },
    }),
  ])

  // Create products for each category
  const products = await Promise.all([
    // T-shirts
    prisma.product.create({
      data: {
        name: 'Classic White T-shirt',
        description: 'A comfortable and versatile white t-shirt made from 100% cotton',
        price: 29.99,
        stock: 100,
        images: ['/images/p1.jpg'],
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Graphic Print T-shirt',
        description: 'Stylish t-shirt with unique graphic design, perfect for casual wear',
        price: 34.99,
        stock: 75,
        images: ['/images/p2.jpg'],
        categoryId: categories[0].id,
      },
    }),
    // Jeans
    prisma.product.create({
      data: {
        name: 'Slim Fit Blue Jeans',
        description: 'Modern slim fit jeans in classic blue wash',
        price: 79.99,
        stock: 50,
        images: ['/images/p3.jpg'],
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Relaxed Fit Black Jeans',
        description: 'Comfortable relaxed fit jeans in black',
        price: 89.99,
        stock: 60,
        images: ['/images/p4.jpg'],
        categoryId: categories[1].id,
      },
    }),
    // Shoes
    prisma.product.create({
      data: {
        name: 'Classic Sneakers',
        description: 'Versatile sneakers perfect for everyday wear',
        price: 99.99,
        stock: 40,
        images: ['/images/p5.jpg'],
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Running Shoes',
        description: 'Lightweight and comfortable running shoes with great support',
        price: 129.99,
        stock: 30,
        images: ['/images/p6.jpg'],
        categoryId: categories[2].id,
      },
    }),
  ])

  console.log({ admin, user, categories, products })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 