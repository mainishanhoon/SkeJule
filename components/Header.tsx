import { CalendarDays } from 'lucide-react';
import ThemeToggle from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import DashboardMenu from '@/components/NavBar';
import Link from 'next/link';
import UserInfo from '@/components/auth/UserInfo';

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink md:hidden" size="icon" variant="outline">
            <CalendarDays
              size={35}
              className="rounded-sm bg-primary p-1.5 text-white"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-70 flex flex-col">
          <SheetTitle>
            <Link
              href="/"
              className="mx-auto mt-5 flex items-center gap-2 text-2xl font-black"
            >
              <CalendarDays
                size={35}
                className="rounded-sm bg-primary p-1 text-white"
              />
              <p className="font-bold tracking-wider font-prompt">
                Ske
                <span className="tracking-wider text-primary">Jule</span>
              </p>
            </Link>
          </SheetTitle>
          <nav className="mt-2 grid gap-2">
            <DashboardMenu />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-x-5">
        <ThemeToggle />

        <UserInfo />
      </div>
    </header>
  );
}
