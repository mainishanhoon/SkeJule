import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth';
import Form from 'next/form';
import requireUser from '@/lib/hooks';
import { LogOut } from 'lucide-react';

export default async function UserInfo() {
  const session = await requireUser();

  return (
    <>
      <Label className="font-mont flex flex-col -space-y-1 font-bold">
        <p className="text-lg tracking-wider text-accent-foreground">
          {session?.user?.name}
        </p>
        <p className="text-right text-sm text-muted-foreground">
          Drug Researcher
        </p>
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <Image
              src={session?.user?.image as string}
              alt="Profile Image"
              width={75}
              height={75}
              className="size-full rounded-xl"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Form
              action={async () => {
                'use server';
                await signOut();
              }}
              className="w-full"
            >
              <Button className="w-full space-x-1" variant="ringHover">
                <LogOut
                  strokeWidth={2.5}
                  size={20}
                  color="hsl(var(--background))"
                />
                <p className="font-bold tracking-wide">Sign Out</p>
              </Button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
