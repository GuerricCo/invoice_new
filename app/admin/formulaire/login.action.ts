"use server";

import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function loginUserAction({
  mail,
  password,
}: {
  mail: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { mail },
  });

  if (!user || user.password !== password) {
    return { error: "Identifiants incorrects" };
  }

  redirect("/admin/formulaire/register");
}
