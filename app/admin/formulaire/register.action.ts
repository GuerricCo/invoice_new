"use server";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function createUserAction(user: {
    name: string,
    firstname: string,
    mail: string,
    password: string;
}) {
    try{
    await prisma.user.create({
        data:{
            name: user.name,
            firstname: user.firstname,
            mail: user.mail,
            password: user.password,

        },
    });
} catch{
    return{
        error: "Error while creating the user.",
    };
}
redirect("/admin/formulaire/register");
}