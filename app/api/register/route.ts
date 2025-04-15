// app/api/register/route.ts
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"; // si alias "@/generated" fonctionne


const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, firstname, mail, password } = await req.json()

  const existingUser = await prisma.user.findUnique({ where: { mail } })

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: { name, firstname, mail, password: hashedPassword },
  })

  return NextResponse.json(user)
}
