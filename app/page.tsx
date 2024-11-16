import LightHeroImage from '@/public/lightHeroImage.webp';
import DarkHeroImage from '@/public/darkHeroImage.webp';
import AuthDialogBox from '@/components/auth/AuthDialog';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Logos from '@/components/landingPage/Logos';
import PageContainer from '@/components/PageContainer';
import ThemeToggle from '@/components/ThemeSwitcher';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Features } from '@/components/landingPage/Features';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <PageContainer scrollable>
      <header className="flex justify-between p-5 px-12">
        <div className="flex items-center space-x-4">
          <CalendarDays
            size={40}
            className="rounded-sm bg-primary p-1.5 text-white"
          />
          <p className="text-3xl font-bold tracking-wider">
            Ske
            <span className="tracking-wider text-primary">Jule</span>
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <ThemeToggle />
          <AuthDialogBox variant="ringHover" text="Try it Free" />{' '}
        </div>
      </header>
      <section className="relative flex items-center justify-center">
        <div className="relative w-full items-center">
          <div className="text-center">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold tracking-wide text-primary">
              Introducing SkeJule 1.0
            </span>

            <h1 className="mt-8 text-4xl font-bold leading-none sm:text-6xl md:text-7xl lg:text-8xl">
              Scheduling made
              <span className="block text-primary">super easy!</span>
            </h1>
            <div className="mt-10 flex items-center justify-center space-x-5">
              <AuthDialogBox variant="gooeyRight" text="Sign In" />
              <Link href={'https://github.com/mainishanhoon/SkeJule'}>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 p-5 text-lg font-bold"
                >
                  <GitHubLogoIcon className="size-6" />
                  <p>GitHub</p>
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full items-center px-6 py-12 md:px-16 lg:px-36">
            <svg
              className="absolute inset-0 -mt-24 blur-3xl"
              style={{ zIndex: -1 }}
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>

            <Image
              src={LightHeroImage}
              alt="Hero"
              priority
              className="relative block w-full rounded-lg border object-cover shadow-2xl dark:hidden lg:rounded-2xl"
            />
            <Image
              src={DarkHeroImage}
              alt="Hero"
              priority
              className="relative hidden w-full rounded-lg border object-cover shadow-2xl dark:block lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
      <Logos />
      <Features />
    </PageContainer>
  );
}
