import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { LogIn } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import AuthModal from '@/components/auth/AuthDialog';

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
          Introducing SkeJule 1.0
        </span>
        <h1 className="mt-8 text-4xl font-bold leading-none sm:text-6xl md:text-7xl lg:text-8xl">
          Scheduling made <span className="block text-primary">super easy</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground lg:text-lg">
          Scheduling a meeting can be a pain. But we at SkeJule make it easy for
          your clients to schedule meetings with you.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="default"
            size="lg"
            className="gap-2 p-5 text-xl text-white"
          >
            <LogIn className="size-6" strokeWidth={3} />
            <AuthModal />
          </Button>
          <Link href={'https://github.com/mainishanhoon/SkeJule'}>
            <Button variant="outline" size="lg" className="gap-2 p-5 text-xl">
              <GitHubLogoIcon className="size-6" />
              <p>GitHub</p>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
