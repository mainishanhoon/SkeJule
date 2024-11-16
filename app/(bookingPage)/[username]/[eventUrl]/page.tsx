import { createMeetingAction } from '@/lib/actions';
import { RenderCalendar } from '@/components/calendar/RenderCalendar';
import { SubmitButton } from '@/components/Buttons';
import { TimeSlots } from '@/components/dashboard/TimeSlots';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/db';
import { BookMarked, CalendarX2, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Form from 'next/form';
import PageContainer from '@/components/PageContainer';
import ThemeToggle from '@/components/ThemeSwitcher';

async function getData(username: string, eventUrl: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        username: username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,

      user: {
        select: {
          image: true,
          name: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const data = await getData(resolvedParams.username, resolvedParams.eventUrl);

  const selectedDate = resolvedSearchParams.date
    ? new Date(resolvedSearchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(selectedDate);

  const showForm = !!resolvedSearchParams.date && !!resolvedSearchParams.time;
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {showForm ? (
        <div className="container mx-auto max-w-5xl p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="grid gap-4 p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={data.user.image as string}
                    alt={`${data.user.name}'s profile picture`}
                    className="rounded-full"
                    width={75}
                    priority
                    height={75}
                  />
                  <div>
                    <p className="text-base font-bold tracking-wide text-muted-foreground">
                      {data.user.name}
                    </p>
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                  </div>
                </div>
                <p className="rounded-sm bg-background p-2 text-sm font-bold tracking-wide text-muted-foreground">
                  {data.description}
                </p>
                <div className="grid gap-2 font-bold">
                  <div className="flex items-center">
                    <CalendarX2 className="mr-2 size-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {formattedDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 size-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {data.duration} Mins
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookMarked className="mr-2 size-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {data.videoCallSoftware}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Form className="grid gap-4" action={createMeetingAction}>
                  <input
                    type="hidden"
                    name="fromTime"
                    value={resolvedSearchParams.time}
                  />
                  <input
                    type="hidden"
                    name="eventDate"
                    value={resolvedSearchParams.date}
                  />
                  <input
                    type="hidden"
                    name="meetingLength"
                    value={data.duration}
                  />
                  <input
                    type="hidden"
                    name="provider"
                    value={data.videoCallSoftware}
                  />
                  <input
                    type="hidden"
                    name="username"
                    value={resolvedParams.username}
                  />
                  <input type="hidden" name="eventTypeId" value={data.id} />

                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <SubmitButton text="Book Meeting" />
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <PageContainer scrollable>
          <div className="flex w-full justify-center">
            <div className="grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-[auto,auto,auto]">
              <Card className="w-96">
                <CardContent className="space-y-2 p-5">
                  <div className="flex justify-between">
                    <Image
                      src={data.user.image as string}
                      alt={`${data.user.name}'s profile picture`}
                      className="size-24 rounded-3xl"
                      priority
                      width={100}
                      height={100}
                    />
                    <ThemeToggle />
                  </div>
                  <p className="text-md mt-1 font-bold text-muted-foreground">
                    {data.user.name}
                  </p>
                  <h1 className="mt-2 text-2xl font-bold">{data.title}</h1>
                  <p className="text-md rounded-sm bg-background p-2 font-bold text-muted-foreground">
                    {data.description}
                  </p>
                  <div className="grid gap-y-3">
                    <p className="flex items-center">
                      <CalendarX2 className="mr-2 size-5 text-primary" />
                      <span className="text-md font-bold text-muted-foreground">
                        {formattedDate}
                      </span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="mr-2 size-5 text-primary" />
                      <span className="text-md font-bold text-muted-foreground">
                        {data.duration} Mins
                      </span>
                    </p>
                    <p className="flex items-center">
                      <BookMarked className="mr-2 size-5 text-primary" />
                      <span className="text-md font-bold text-muted-foreground">
                        Google Meet
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 bg-background">
                <CardContent className="p-5 text-center">
                  <RenderCalendar availablility={data.user.Availability} />
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1">
                <CardContent className="p-5">
                  <TimeSlots
                    selectedDate={selectedDate}
                    username={resolvedParams.username}
                    meetingDuration={data.duration}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      )}
    </div>
  );
}
