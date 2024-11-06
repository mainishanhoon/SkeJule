import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { signIn } from '@/lib/auth';
import { Dna } from 'lucide-react';
import Form from 'next/form';
import { GitHubAuthButton, GoogleAuthButton } from '@/components/Buttons';

export default function AuthDialogBox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="bg-muted sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-center gap-2">
          <Dna size={45} className="rounded-2xl bg-primary p-1 text-white" />
          <p className="text-4xl font-bold tracking-wide">
            Chemi
            <span className="tracking-normal text-primary">Sphere</span>
          </p>
        </DialogHeader>
        <DialogTitle>
          <p className="mb-5 text-center text-3xl tracking-wide">
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
