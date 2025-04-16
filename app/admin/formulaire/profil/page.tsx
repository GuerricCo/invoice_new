'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

type Company = {
  id: number;
  name: string;
}

export default function ProfilPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [company, setCompany] = useState<Company[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/formulaire/login")
    } else if (status === "authenticated") {
      fetch("/api/company")
        .then(res => res.json())
        .then(data => setCompany(data))
    }
  }, [status])

  const handleDelete = async (id: number) => {
    await fetch(`/api/company/${id}`, { method: "DELETE" })
    setCompany(prev => prev.filter(c => c.id !== id))
  }

  if (status === "loading") return <p>Chargement de la session...</p>

  return (
    <div className="p-6 max-w-6xl mx-auto flex gap-8 h-[calc(50vh-50px)]">
  <Card className="w-1/3 p-6 space-y-4 max-h-full overflow-y-auto">

        <h1 className="text-2xl font-bold">Bienvenue {session?.user?.name}</h1>
        <div>
          <p><strong>Nom:</strong> {session?.user?.name}</p>
          <p><strong>Prénom:</strong> {session?.user?.firstname}</p>
          <p><strong>Email:</strong> {session?.user?.mail}</p>
        </div>
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/admin/formulaire/login" })}
        >
          Se déconnecter
        </Button>
      </Card>

      <div className="w-2/3 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mes entreprises</h2>
          <Link href="/admin/formulaire/create-company">
            <Button>Ajouter</Button>
          </Link>
        </div>

        <div className="space-y-4">
        {company.map((company) => (
  <Card key={company.id} className="p-4">
    <div className="flex justify-between items-center w-full">
      <Link
        href={`/entreprise/${company.id}`}
        className="text-lg font-medium hover:underline"
      >
        {company.name}
      </Link>
      <Button
        variant="destructive"
        onClick={() => handleDelete(company.id)}
      >
        Supprimer
      </Button>
    </div>
  </Card>
))}


        </div>
      </div>
    </div>
  )
}
