import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export const runtime = 'nodejs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        // Handle OAuth sign-in
        if (!user.email) return false
        
        // Check if user exists in database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        })

        if (!existingUser) {
          // Create new user for OAuth
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email,
              image: user.image,
              role: "USER",
            }
          })
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // For OAuth users, get role from database
        if (account?.provider === "google" || account?.provider === "github") {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
          token.role = dbUser?.role || "USER"
        } else {
          // For credentials users, role is already in user object
          token.role = (user as { role?: string })?.role
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: (token as { role?: string })?.role,
        }
      }
    }
  }
}) 