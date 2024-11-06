import Header from '@/components/Header';
import { DashboardMenu } from '@/components/NavBar';
import PageContainer from '@/components/PageContainer';
import requireUser from '@/lib/hooks';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      grantId: true,
    },
  });

  if (!data?.username) {
    return redirect('/onboarding');
  }

  if (!data.grantId) {
    return redirect('/onboarding/grant-id');
  }

  return data;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <section className="grid min-h-screen min-w-full md:grid-cols-[210px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-2 lg:h-[60px]">
            <Link
              href="/"
              className="mx-auto flex items-center gap-2 text-2xl font-black"
            >
              <CalendarDays
                size={35}
                className="rounded-sm bg-primary p-1.5 text-white"
              />
              <p className="tracking-wider">
                Ske
                <span className="tracking-normal text-primary">Jule</span>
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium">
              <DashboardMenu />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header />
        <PageContainer scrollable>
          <main className="flex flex-1 flex-col gap-4 p-3 lg:gap-6">
            {children}
          </main>
        </PageContainer>
      </div>
    </section>
  );
}
