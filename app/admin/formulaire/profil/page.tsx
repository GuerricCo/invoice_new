// app/profil/page.tsx
'use client'

import { Button } from "@/src/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card } from "@/src/components/ui/card"

export default function ProfilPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/formulaire/login")
    }
  }, [status, router])

  if (status === "loading") return <p>Chargement de la session...</p>

  return (
    <div className="p-6 max-w-xl mx-auto">

      <Card className="p-6 shadow-lg rounded-md bg-white space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue {session?.user?.name ?? "Utilisateur"}</h1>


        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Email :</span>
            <span>{session?.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-lg">ID :</span>
            <span>{session?.user?.id}</span>
          </div>
        </div>


        <div className="mt-6 text-center">
          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/admin/formulaire/login" })}
            className="w-full"
          >
            Se déconnecter
          </Button>
        </div>
      </Card>
    </div>
  )
}
