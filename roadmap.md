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

8. Setup the Auth. Go to Auth.js site, copy all the text in the Auth installation (for Next.js) session, and paste it on the chat panel to prompt the setup
```
Let's move on to Auth, use this document to implement it
(along with the content copied from the auth.js site)
```
as we're gonna use JWT, so ignore prisma-adapter if it's shown(simply just reply 'no need to use this package)
**The AI didn't finish all the steps under "Implement NextAuth.js authentication:", have to check everything is done before moving on the next step, especially the "Protected routes"**

9. After this, it will generate an AUTH_SECRET, which likely will be in .env.local file, move it to .env file and then delete the .env.local file. **This key is also important for vercel deployment, go to vercel project page->setting->Enviroment Variables, and add the Auth_SECRET key and its value there**

10. check the auth.ts file and see if there is any error. If so, ask the chat to fix it

11. auth is done, mark it as done and move on
```
- [ ] Implement NextAuth.js authentication:
  - Email/Password
  - OAuth providers (Google, GitHub)
  - JWT handling
  - Protected routes
Mark this step as done and go for next step
```

12. implement the Home Layout with the following prompt
```
Let's now implement the Core Features starting from Home Layout. Only implement what's written on the list, don't add any extra feature. We're using Router Groups, so if there's any conflict route, delete the related file 
```
note that we are using Router Groups(A route feature from NextJs framework), we should prompt AI to delete conflict route

13