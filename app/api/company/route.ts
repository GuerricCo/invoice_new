// app/api/company/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const companies = await prisma.company.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { name, calendarUrl, hourlyRate, startDate, endDate, userId } = body;

  try {
    const company = await prisma.company.create({
      data: {
        name,
        calendarUrl,
        hourlyRate,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: "Erreur de création" }, { status: 500 });
  }
}
