// app/api/formulaire/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.NODE_ENV,
  });
}

export async function POST(request: NextRequest) {
  const json = await request.json();

  await new Promise((r) => setTimeout(r, 1000));

  const newUser = await prisma.user.create({
    data: {
      name: json.name,
      firstname: json.firstname,
      mail: json.mail,
      password: json.password,
    },
  });

  return NextResponse.json({
    user: newUser,
  });
}
