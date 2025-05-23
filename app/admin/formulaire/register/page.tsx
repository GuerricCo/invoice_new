// app/register/page.tsx
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [firstname, setFirstname] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, firstname, mail, password }),
    })

    if (res.ok) {
      router.push("/admin/formulaire/login")
    } else {
      alert("Cet email existe déjà")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
  <Card className="p-8 shadow-lg rounded-lg w-full sm:max-w-md mx-auto bg-white">
    <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Nom <span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Prénom <span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} 
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <Input 
            type="email" 
            value={mail} 
            onChange={(e) => setMail(e.target.value)} 
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>



          <Button 
            type="submit" 
            variant="default" 
            className="w-full py-3 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg"
          >
            S'inscrire
          </Button>
          <Button
  type="button"
  variant="outline"
  className="w-full py-3 text-blue-500 border-blue-500 hover:bg-blue-50 rounded-lg"
  onClick={() => router.push("/admin/formulaire/login")}
>
  Se connecter
</Button>
        </form>
      </Card>
    </div>
  )
}
