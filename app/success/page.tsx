import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SuccessPage() {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground bg-muted p-8 text-center animate-in fade-in-50">
        <div className="flex size-24 items-center justify-center rounded-full bg-green-500/10">
          <BadgeCheck strokeWidth={3} className="size-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">
          Success, we received your message!
        </h2>
        <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm font-bold leading-tight text-muted-foreground">
          Our team will get back to you shortly.
        </p>

        <Button variant="default" size="lg" asChild>
          <Link href="/">Go back to Homepage</Link>
        </Button>
      </div>
    </section>
  );
}
