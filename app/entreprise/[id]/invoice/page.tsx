import { prisma } from "@/src/lib/prisma";
import { icalFetchAction } from "@/src/actions/icalFetchAction";
import InvoiceClient from "@/src/components/invoiceClient";


type Props = {
  params: { id: string };
};

export default async function InvoicePage({ params }: Props) {
  const companyId = parseInt(params.id, 10);
  if (isNaN(companyId)) return <div>ID invalide</div>;


  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { user: true },
  });

  if (!company || !company.calendarUrl) {
    return <div>Entreprise ou URL de calendrier introuvable.</div>;
  }


  const data = await icalFetchAction(company.calendarUrl);

  if (!data || data.error) {
    return <div>Erreur lors du chargement des événements iCal.</div>;
  }


  return (
    <div>
      <InvoiceClient 
        events={data.events || []} 
        hourlyRate={company.hourlyRate} 
        tvaRate={company.tvaRate} 
        client={company.user}
        company={company}
      />
    </div>
  );
}
