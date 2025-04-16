// src/components/CompanyForm.tsx
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export default function CompanyForm({ userId }: { userId: number }) {
  const [name, setName] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [tvaRate, setTvaRate] = useState("");
  const [mail, setMail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify({
        name,
        calendarUrl,
        hourlyRate: parseInt(hourlyRate, 10),
        tvaRate: parseInt(tvaRate, 10),
        mail,
        userId
      }),
    });

    if (res.ok) {
      router.push("/admin/formulaire/profil");
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <Input placeholder="Nom de l'entreprise" value={name} onChange={e => setName(e.target.value)} />
  <Input placeholder="URL du calendrier" value={calendarUrl} onChange={e => setCalendarUrl(e.target.value)} />
  <Input placeholder="Taux horaire" type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
  <Input placeholder="Taxe" type="number" value={tvaRate} onChange={e => setTvaRate(e.target.value)} />
  <Input placeholder="Mail entreprise" type="email" value={mail} onChange={e => setMail(e.target.value)} />
  
  <Button
    type="submit"
    variant="default"
    className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg"
  >
    Créer
  </Button>
  <Button
    type="button"
    variant="outline"
    onClick={() => router.push("/admin/formulaire/profil")}
    className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
  >
    Retour au profil
  </Button>
</form>

  );
}
