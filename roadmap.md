# Roadmap
1.create an empty folder and prompt the AI to create a Next.js project

2.create a `.cursorrules` file, paste the prepared content in it, create a session called *ScratchPad*, and prompt the AI to generate the development steps with the following prompt
```
Create development steps in `Scratchpad` of `.cursorrules` to create an ecommerce website with admin dashboard like amazon using TypeScript, Next.js 15, Shadcn, Lucide, Zod, Zustand, Recharts, Resend, Uploadthing, Prisma, PostgreSQL, next-auth@beta, Stripe.
```

3.prompt the AI to install all the dependencies written under the *ScratchPad* step. Only installing, no configuration

4.we got the project ready, test it if everything is fine. If so, milestone checked.

5.login in the vercel, connect your Github account, create a vercel project. Inside the vercel project, choose *Storage* tag and then create a database. Copy only the DATABASE_URL, create a .evn file in the root path of your project and paste the DATABASE_URL there.

6.prompt the AI to create the database table with the following prompt
```
we already set DATABASE_URL in .env, Make this step done

- [ ] Set up PostgreSQL database

Start from this step

- [ ] Configure Prisma schema:
  - User model
  - Product model
  - Category model
  - Order model
  - Review model
  - Cart model
```

7. Seed (insert some test data) some data into the database with the following prompt
```
Seed sample categories, products and users. For category and product images, use the images inside public/images folder. We have three categories. T-shirt, jeans and shoes and two products inside each category
```
after it's successfully executed, go to Neon and check if the data is inserted. If so, database is ready, milestone