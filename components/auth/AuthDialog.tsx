import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { signIn } from '@/lib/auth';
import { CalendarDays, LogIn } from 'lucide-react';
import Form from 'next/form';
import { GitHubAuthButton, GoogleAuthButton } from '@/components/Buttons';

type variantName =
  | 'default'
  | 'destructive'
  | 'constructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'expandIcon'
  | 'ringHover'
  | 'shine'
  | 'gooeyRight'
  | 'gooeyLeft'
  | 'linkHover1'
  | 'linkHover2'
  | null
  | undefined;

export default function AuthDialogBox({
  text,
  variant,
}: {
  text: string;
  variant: variantName;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant={variant} className="space-x-2 p-5 text-lg">
          <LogIn strokeWidth={3} /> <p className='tracking-wider'>{text}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl bg-muted sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-center gap-2">
          <CalendarDays
            size={45}
            className="rounded-lg bg-primary p-1.5 text-white"
          />
          <p className="text-4xl font-bold tracking-wider">
            Ske
            <span className="tracking-normal text-primary">Jule</span>
          </p>
        </DialogHeader>
        <DialogTitle>
          <p className="mb-5 text-center text-2xl tracking-wider md:text-3xl">
            <span className="rounded-xl bg-primary/10 px-2">Access</span>
            &nbsp;your Account
          </p>
        </DialogTitle>
        <div className="mt-5 flex flex-col gap-3">
          <Form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <GoogleAuthButton />
          </Form>
          <Form
            action={async () => {
              'use server';
              await signIn('github');
            }}
          >
            <GitHubAuthButton />
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
