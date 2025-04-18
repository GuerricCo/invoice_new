import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Bienvenue</h1>
        <p className="text-lg text-gray-600 mb-6">
          Pour accéder à votre compte ou en créer un, choisissez une des options ci-dessous.
        </p>
        <div className="flex flex-col gap-4">
          <Link href='/admin/formulaire/register'>
            <Button className="w-full">S'inscrire</Button>
          </Link>
          <Link href='/admin/formulaire/login'>
            <Button className="w-full">Se connecter</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
