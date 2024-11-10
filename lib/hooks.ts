import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/onboarding');
  }

  return session;
}
