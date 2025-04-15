// app/admin/formulaire/create-company/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import CompanyForm from "@/src/components/CompanyForm";

export default async function CreateCompanyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-center mt-10">Accès refusé. Veuillez vous connecter.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Créer une entreprise</h1>
      <CompanyForm userId={session.user.id} />
    </div>
  );
}
