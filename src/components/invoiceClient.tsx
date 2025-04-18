"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { icalFetchAction } from "@/src/actions/icalFetchAction";
import Link from "next/link";

const fetchEvents = async (calendarUrl: string, start: string, end: string) => {
  if (!calendarUrl) return [];

  const events = await icalFetchAction(calendarUrl, start, end);
  return events || [];
};

type Event = {
  summary: string;
  totalHours: number;
  start?: string;
  end?: string;
};

type Client = {
  name: string;
  firstname: string;
  mail: string;
};

type Company = {
  name: string;
  mail: string;
  adresse: string;
  calendarUrl: string;
};

type Props = {
  events: Event[];
  hourlyRate: number;
  tvaRate: number;
  client: Client;
  company: Company;
  calendarUrl: string;
};

export default function InvoiceClient({
  events,
  hourlyRate,
  tvaRate,
  client,
  company,
}: Props) {
  const [eventList, setEventList] = useState(events);
  const [clientInfo, setClientInfo] = useState<Client>(client);
  const [companyInfo, setCompanyInfo] = useState<Company>(company);
  const [modeImpression, setModeImpression] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
const [endDate, setEndDate] = useState<string>('');
const [reference, setReference] = useState("");


  useEffect(() => {
    const loadEvents = async () => {
      if (!companyInfo.calendarUrl) return;
      
      const fetchedEvents = await fetchEvents(companyInfo.calendarUrl, startDate, endDate);
      setEventList(fetchedEvents);
    };

    loadEvents();
  }, [startDate, endDate, companyInfo.calendarUrl]);

  const handleDeleteEvent = (indexToDelete: number) => {
    setEventList(eventList.filter((_, index) => index !== indexToDelete));
  };

  const filteredEvents = eventList.filter((event) => {
    if (!startDate || !endDate || !event.start) return true;

    const eventStart = new Date(event.start);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return eventStart >= start && eventStart <= end;
  });

  const totalHours = filteredEvents.reduce((acc, event) => acc + event.totalHours, 0);
  const totalPriceTVA = totalHours * hourlyRate;
  const totalPrice = totalHours * hourlyRate * (1 - tvaRate / 100);
  const TVA = totalHours * hourlyRate * (tvaRate/100);

  const handleAddEvent = () => {
    setEventList([...eventList, { summary: "", totalHours: 0 }]);
  };

  const handleGenerateInvoice = () => {
    setModeImpression(true);
    setTimeout(() => {
      window.print();
      setModeImpression(false);
    }, 100);
  };

  if (modeImpression) {
    return (
      <div className="p-10">
  <h1 className="text-3xl font-bold mb-2">Facture</h1>
  {reference && (
  <p className="text-gray-600 mb-2">
    Référence : {reference}
  </p>
)}


  {startDate && endDate && (
    <p className="text-gray-600 mb-6">
      Pour la période du {new Date(startDate).toLocaleDateString()} au {new Date(endDate).toLocaleDateString()}
    </p>
  )}

  <div className="flex gap-8 mb-6">
    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-2">Client :</h2>
      <p>{clientInfo.firstname} {clientInfo.name}</p>
      <p>{clientInfo.mail}</p>
    </div>

    <div className="w-1/2">
      <h2 className="text-xl font-semibold mb-2">Entreprise :</h2>
      <p>{companyInfo.name}</p>
      <p>{companyInfo.mail}</p>
      <p>{companyInfo.adresse}</p>
    </div>
  </div>

  <div className="mb-6">
  <h2 className="text-xl font-semibold mb-2">Événements :</h2>
  {filteredEvents.map((event, index) => (
    <div key={index} className="flex justify-between items-center py-2 border-b">
      <div className="flex-1">
        <span className="block font-medium">{event.summary}</span>
      </div>
      <div className="w-32 text-center">
        <span>{event.totalHours}h</span>
      </div>
      <div className="w-32 text-right font-semibold">
        {(event.totalHours * hourlyRate).toFixed(2)} €
      </div>
    </div>
  ))}
</div>


  <hr className="my-6" />

  <div className="flex justify-between">
    <span className="font-medium">Total des heures :</span>
    <span>{totalHours} heures</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Prix HT :</span>
    <span>{totalPrice.toFixed(2)} €</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">TVA :</span>
    <span>{TVA.toFixed(2)} €</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Prix TTC :</span>
    <span>{totalPriceTVA.toFixed(2)} €</span>
  </div>
  
</div>

    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Facture</h1>
      <div className="flex flex-col mb-6">
  <label htmlFor="reference" className="block font-medium mb-1">Référence :</label>
  <input
    type="text"
    id="reference"
    value={reference}
    onChange={(e) => setReference(e.target.value)}
    className="border border-gray-300 rounded-lg p-3 w-full"
    placeholder="Référence de la facture"
  />
</div>


      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Client :</h2>
          <input
            type="text"
            value={clientInfo.firstname}
            onChange={(e) => setClientInfo({ ...clientInfo, firstname: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Prénom"
          />
          <input
            type="text"
            value={clientInfo.name}
            onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Nom"
          />
          <input
            type="email"
            value={clientInfo.mail}
            onChange={(e) => setClientInfo({ ...clientInfo, mail: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Email"
          />
        </Card>

        <Card className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Entreprise :</h2>
          <input
            type="text"
            value={companyInfo.name}
            onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Nom de l'entreprise"
          />
          <input
            type="email"
            value={companyInfo.mail}
            onChange={(e) => setCompanyInfo({ ...companyInfo, mail: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Email de l'entreprise"
          />
          <input
            type="text"
            value={companyInfo.adresse}
            onChange={(e) => setCompanyInfo({ ...companyInfo, adresse: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Adresse de l'entreprise"
          />
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full">
          <label className="block font-medium mb-1">Date début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              const newStart = e.target.value;
              setStartDate(newStart);
            }}
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>
        <div className="w-full">
          <label className="block font-medium mb-1">Date fin :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              const newEnd = e.target.value;
              setEndDate(newEnd);
            }}
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Événements</h2>
          <button
            onClick={handleAddEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </div>

        {filteredEvents.map((event, index) => {
          const realIndex = eventList.indexOf(event);

          return (
            <div key={realIndex} className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                value={event.summary}
                className="border border-gray-300 rounded-lg p-3 flex-1"
                placeholder="Résumé de l'événement"
                onChange={(e) => {
                  const updatedEvents = [...eventList];
                  updatedEvents[realIndex].summary = e.target.value;
                  setEventList(updatedEvents);
                }}
              />
              <input
                type="number"
                value={event.totalHours.toString()}
                className="border border-gray-300 rounded-lg p-3 w-32"
                placeholder="Heures"
                onChange={(e) => {
                  const updatedEvents = [...eventList];
                  updatedEvents[realIndex].totalHours = parseInt(e.target.value, 10) || 0;
                  setEventList(updatedEvents);
                }}
              />
              <button
                onClick={() => handleDeleteEvent(realIndex)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Total des heures :</span>
        <span>{totalHours} heures</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Prix HT :</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between">
        <span className="font-medium">TVA :</span>
          <span>{TVA.toFixed(2)} €</span>
        </div>
      <div className="flex justify-between">
        <span className="font-medium">Prix TTC :</span>
          <span>{totalPriceTVA.toFixed(2)} €</span>
        </div>

      

        <div className="space-y-4">
        <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center">
  <button
    onClick={handleGenerateInvoice}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
  >
    Générer la facture
  </button>

  <Link
    href="/admin/formulaire/profil"
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center"
  >
    Profil
  </Link>
</div>

</div>

</div>


      </div>

  );
}
