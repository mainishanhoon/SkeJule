import { cancelMeetingAction } from '@/lib/actions';
import EmptyState from '@/components/EmptyState';
import { SubmitButton } from '@/components/Buttons';
import { auth } from '@/lib/auth';
import { nylas } from '@/lib/nylas';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { format, fromUnixTime } from 'date-fns';
import { Icon, Video } from 'lucide-react';

import React from 'react';
import Form from 'next/form';

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error('User not found');
  }
  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingsPage() {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          text="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <Form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM')}
                    </p>
                    <p className="pt-1 text-xs text-muted-foreground">
                      {format(fromUnixTime(item.when.startTime), 'hh:mm a')} -{' '}
                      {format(fromUnixTime(item.when.endTime), 'hh:mm a')}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Video className="mr-2 size-4 text-primary" />{' '}
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        target="_blank"
                        href={item.conferencing.provider.url}
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="ml-auto flex w-fit"
                  />
                </div>
                <Separator className="my-3" />
              </Form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};
