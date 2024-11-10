import { CreateMeetingAction } from '@/lib/actions';
import { RenderCalendar } from '@/components/calendar/RenderCalendar';
import { SubmitButton } from '@/components/Buttons';
import { TimeSlots } from '@/components/dashboard/TimeSlots';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { BookMarked, CalendarX2, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Form from 'next/form';

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
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {
  const data = await getData(params.username, params.eventUrl);

  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {showForm ? (
        <Card className="max-w-2xl">
          <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr,auto,1fr]">
            <div>
              <Image
                src={data.user?.image as string}
                alt={`${data.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={75}
                height={75}
              />
              <p className="mt-1 text-md font-bold text-muted-foreground">
                {data.user.name}
              </p>
              <h1 className="mt-2 text-xl font-bold">{data.title}</h1>
              <p className="text-sm font-font text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <Form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <input type="hidden" name="provider" value={data.videoCallSoftware} />
              <input type="hidden" name="username" value={params.username} />
              <input type="hidden" name="eventTypeId" value={data.id} />

              <div className="flex flex-col gap-y-1">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-y-1">
                <Label>Your Email</Label>
                <Input name="email" placeholder="loremipsum@email.com" />
              </div>

              <SubmitButton text="Book Meeting" />
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto w-full max-w-[1000px]">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={data.user.image as string}
                alt={`${data.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {data.user.name}
              </p>
              <h1 className="mt-2 text-xl font-semibold">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>
              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Google Meet
                  </span>
                </p>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <div className="my-4 md:my-0">
              <RenderCalendar availablility={data.user.Availability} />
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <TimeSlots
              selectedDate={selectedDate}
              username={params.username}
              meetingDuration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
