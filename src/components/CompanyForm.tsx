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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify({
        name,
        calendarUrl,
        hourlyRate: parseFloat(hourlyRate),
        startDate,
        endDate,
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
      <Input placeholder="Date de début" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <Input placeholder="Date de fin" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <Button type="submit">Créer</Button>
    </form>
  );
}
