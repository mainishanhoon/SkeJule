'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader, LoaderCircle, Trash2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface ButtonProps {
  text: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'ringHover'
    | null
    | undefined;
  className?: string;
}

export function DeleteButton(onClick: Function) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="absolute inset-x-0 inset-y-24 h-8 w-32 opacity-0 transition-opacity group-hover:opacity-100"
      variant="destructive"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <>
          <Trash2 strokeWidth={3} className="mr-1 size-4" />
          <p className="font-bold tracking-wide">Delete</p>
        </>
      )}
    </Button>
  );
}

export function SubmitButton({ text, variant, className }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn('w-fit', className)}>
          <Loader className="mr-2 size-4 animate-spin [animation-duration:3s]" />
          Please Wait...
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn('w-fit tracking-wider', className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          className="w-full border-2 border-primary"
        >
          <Loader
            strokeWidth={2}
            size={25}
            className="mr-2 animate-spin [animation-duration:3s]"
          />
          Please wait...
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full space-x-2 border-2 border-muted-foreground hover:border-primary hover:bg-primary/10"
          variant="outline"
        >
          <FcGoogle className="size-6" />
          <p className="font-bold">Sign In with Google</p>
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="outline"
          className="w-full border-2 border-primary"
        >
          <Loader
            strokeWidth={2}
            size={25}
            className="mr-2 animate-spin [animation-duration:3s]"
          />
          Please wait...
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full space-x-2 border-2 border-muted-foreground hover:border-primary hover:bg-primary/10"
          variant="outline"
        >
          <GitHubLogoIcon className="size-6" />
          <p className="font-bold">Sign In with GitHub</p>
        </Button>
      )}
    </>
  );
}
