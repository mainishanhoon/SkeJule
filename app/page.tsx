import AuthModal from '@/components/auth/AuthDialog';
import ThemeToggle from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect('/onboarding');
  }

  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <CalendarDays
        size={75}
        strokeWidth={2}
        className="rounded-3xl bg-primary p-3 text-white"
      />
      <ThemeToggle />
      <AuthModal />
      <Button variant="ringHover">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
