'use client';

import * as React from 'react';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="group relative h-10 w-10 overflow-hidden rounded-full"
    >
      {/* Light mode: Sun icon, replaced by Sunset on hover */}
      <Sun className="absolute inset-0 m-auto h-5 w-5 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 dark:scale-0 dark:opacity-0" />
      <Sunset className="absolute inset-0 m-auto h-5 w-5 scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:hidden" />

      {/* Dark mode: Moon icon, replaced by Sunrise on hover */}
      <Moon className="absolute inset-0 m-auto h-5 w-5 scale-0 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100 dark:group-hover:scale-0 dark:group-hover:opacity-0" />
      <Sunrise className="absolute inset-0 m-auto h-5 w-5 scale-0 opacity-0 transition-all duration-300 dark:group-hover:scale-100 dark:group-hover:opacity-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
