// app/api/company/[id]/route.ts
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const companyId = parseInt(params.id);

  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company || company.userId !== session.user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  await prisma.company.delete({
    where: { id: companyId },
  });

  return NextResponse.json({ success: true });
}
