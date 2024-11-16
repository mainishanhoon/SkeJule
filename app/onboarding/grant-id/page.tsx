import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardingRouteTwo() {
  return (
    <div className="flex h-screen items-center justify-center px-5">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-wider">
            You&apos;re almost Done!
          </CardTitle>
          <CardDescription className="text-md font-bold tracking-wider">
            We have to now connect your calendar to your account.
          </CardDescription>
          <Image
            src="/giphy.gif"
            width={100}
            height={100}
            unoptimized
            alt=""
            className="w-full rounded-3xl"
          />
        </CardHeader>
        <CardContent>
          <Button asChild variant="ringHover" className="w-full">
            <Link href="/api/auth" className="space-x-2 tracking-wider">
              <CalendarCheck strokeWidth={2.5} />
              <p>Connect Calendar to your Account</p>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
