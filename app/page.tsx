import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4">
      <Link href='/admin/formulaire/register'>
        <Button>S'inscrire</Button>
      </Link>
      <Link href='/admin/formulaire/login'>
        <Button>Se connecter</Button>
      </Link>
    </main>
  );
}