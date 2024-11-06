import { CalendarCog, CalendarRange, Cog, UsersRound } from 'lucide-react';

export const NavigationLinks = [
  {
    name: 'Event Types',
    href: '/events',
    icon: CalendarCog,
  },
  {
    name: 'Meetings',
    href: '/meetings',
    icon: UsersRound,
  },
  {
    name: 'Availability',
    href: '/availability',
    icon: CalendarRange,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog,
  },
];
