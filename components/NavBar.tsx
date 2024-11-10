'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { NavigationLinks } from '@/constants/navItems';

export default function DashboardMenu() {
  const pathname = usePathname();
  return (
    <>
      {NavigationLinks.map((label) => (
        <Link
          href={label.href}
          key={label.name}
          className={cn(
            pathname == label.href
              ? 'bg-primary/20 text-primary'
              : 'bg-muted/50 text-muted-foreground hover:text-foreground/5',
            'mt-1 flex items-center gap-2 rounded-lg px-7 py-1.5 text-lg font-bold tracking-wide transition-all hover:text-primary/50',
          )}
        >
          <label.icon size={30} strokeWidth={2.5} />
          {label.name}
        </Link>
      ))}
    </>
  );
}
