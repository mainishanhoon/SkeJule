'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { SubmitButton } from '@/components/Buttons';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { eventTypeSchema } from '@/utils/schema';
import { EditEventTypeAction } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ButtonGroup } from '@/components/dashboard/ButtonGroup';
import { useActionState, useState } from 'react';
import Form from 'next/form';

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type Platform = 'Zoom Meeting' | 'Google Meet' | 'Microsoft Teams';

export function EditEventTypeForm({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
}: iAppProps) {
  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  const [activePlatform, setActivePlatform] = useState<Platform>(
    callProvider as Platform,
  );

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book times.
          </CardDescription>
        </CardHeader>
        <Form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="30 min meeting"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Url</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center rounded-l-md border-2 border-muted-foreground/50 bg-muted px-3 text-sm text-muted-foreground">
                  SkeJule.com/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={url}
                  name={fields.url.name}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>

              <p className="text-sm text-red-500">{fields.url.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="30 min meeting"
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="text-sm text-red-500">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <Label>Video Call Provider</Label>
              <ButtonGroup className="w-full">
                <Button
                  onClick={() => togglePlatform('Zoom Meeting')}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === 'Zoom Meeting'
                      ? 'constructive'
                      : 'outline'
                  }
                >
                  Zoom
                </Button>
                <Button
                  onClick={() => togglePlatform('Google Meet')}
                  type="button"
                  className="w-full"
                  variant={
                    activePlatform === 'Google Meet'
                      ? 'constructive'
                      : 'outline'
                  }
                >
                  Google Meet
                </Button>
                <Button
                  variant={
                    activePlatform === 'Microsoft Teams'
                      ? 'constructive'
                      : 'outline'
                  }
                  type="button"
                  className="w-full"
                  onClick={() => togglePlatform('Microsoft Teams')}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="flex w-full justify-between">
            <Button asChild variant="destructive">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Save Changes" />
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
