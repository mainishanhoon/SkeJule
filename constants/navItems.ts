import { CalendarCog, CalendarRange, Cog, UsersRound } from 'lucide-react';

export const NavigationLinks = [
  {
    name: 'Event Types',
    href: '/dashboard',
    icon: CalendarCog,
  },
  {
    name: 'Meetings',
    href: '/dashboard/meetings',
    icon: UsersRound,
  },
  {
    name: 'Availability',
    href: '/dashboard/availability',
    icon: CalendarRange,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Cog,
  },
];
