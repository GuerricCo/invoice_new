// app/login/page.tsx
'use client'

import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      mail,
      password,
    })
    if (res?.ok) {
      router.push("/admin/formulaire/profil")
    } else {
      alert("Échec de la connexion")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <Card className="p-8 shadow-lg rounded-lg w-full sm:max-w-md mx-auto bg-white">
  <h2 className="text-2xl font-bold text-center mb-6">Se connecter</h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">Email</label>
      <Input 
        type="email" 
        value={mail} 
        onChange={(e) => setMail(e.target.value)} 
        className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">Mot de passe</label>
      <Input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <Button 
      type="submit" 
      variant="default" 
      className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg"
    >
      Se connecter
    </Button>

    <Button
      type="button"
      variant="outline"
      className="w-full py-3 text-blue-500 border-blue-500 hover:bg-blue-50 rounded-lg"
      onClick={() => router.push("/admin/formulaire/register")}
    >
      S'inscrire
    </Button>
  </form>
</Card>

    </div>
  )
}
