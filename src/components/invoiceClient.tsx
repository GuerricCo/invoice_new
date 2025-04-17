"use client";

import { useState } from "react";

type Event = {
  summary: string;
  totalHours: number;
};

type Props = {
  events: Event[];
  hourlyRate: number;
  tvaRate: number;
  client: {
    name: string;
    firstname: string;
    mail: string;
  };
  company: {
    name: string;
    mail: string;
  };
};

export default function InvoiceClient({
  events,
  hourlyRate,
  tvaRate,
  client,
  company,
}: Props) {
  const [eventList, setEventList] = useState(events);

  const totalHours = eventList.reduce((acc, event) => acc + event.totalHours, 0);
  const totalPrice = totalHours * hourlyRate * (1 - tvaRate / 100);
  const handleAddEvent = () => {
    setEventList([...eventList, { summary: "", totalHours: 0 }]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Facture</h1>

      <div>
        <h2 className="text-xl font-semibold">Client :</h2>
        <p>{client.firstname} {client.name}</p>
        <p>{client.mail}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Entreprise :</h2>
        <p>{company.name}</p>
        <p>{company.mail}</p>
      </div>


      <h2 className="text-xl font-semibold">Événements</h2>
      {eventList.map((event, index) => (
        <div key={index} className="flex gap-4 items-center mb-4">
          <input
            type="text"
            value={event.summary}
            className="border p-2 w-full"
            placeholder="Résumé de l'événement"
            onChange={(e) => {
              const updatedEvents = [...eventList];
              updatedEvents[index].summary = e.target.value;
              setEventList(updatedEvents);
            }}
          />
          <input
            type="number"
            value={event.totalHours.toString()}
            className="border p-2 w-24"
            placeholder="Heures"
            onChange={(e) => {
              const updatedEvents = [...eventList];
              updatedEvents[index].totalHours = parseInt(e.target.value, 10) || 0;
              setEventList(updatedEvents);
            }}
          />
        </div>
      ))}

      <button
        onClick={handleAddEvent}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Ajouter un événement
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total des heures</h2>
        <p>{totalHours} heures</p>
      </div>

      <div className="mt-2">
        <h2 className="text-xl font-semibold">Prix total (TVA incluse)</h2>
        <p>{totalPrice.toFixed(2)} €</p>
      </div>
    </div>
  );
}
