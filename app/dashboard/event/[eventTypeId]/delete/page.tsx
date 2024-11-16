import { DeleteEventTypeAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import Form from 'next/form';
import { SubmitButton } from '@/components/Buttons';

export default async function DeleteEventType({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="tracking-wider">Delete Event Type</CardTitle>
          <CardDescription className="tracking-wide">
            Are you sure you want to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button asChild variant="default">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={resolvedParams.eventTypeId} />
            <SubmitButton text="Delete" variant="destructive" />
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
