import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      name?: string | null
      firstname?: string | null
      mail?: string | null
      image?: string | null
    }
  }

  interface User {
    id: number
    name: string
    firstname: String
    mail: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    mail: string
  }
}
