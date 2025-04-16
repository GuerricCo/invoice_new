// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@/generated/prisma"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mail: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.mail || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { mail: credentials.mail },
        })

        if (!user) throw new Error("No user found")

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) throw new Error("Invalid password")

        return {
          id: user.id,
          name: user.name,
          firstname: user.firstname,
          mail: user.mail,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number
        token.mail = user.mail
        token.name = user.name
        token.firstname = (user as any).firstname
      }
      return token
    },
  
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id
        session.user.mail = token.mail as string
        session.user.name = token.name as string
        (session.user as any).firstname = token.firstname as string
      }
      return session
    }
  }
,  
  secret: process.env.NEXTAUTH_SECRET,

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
