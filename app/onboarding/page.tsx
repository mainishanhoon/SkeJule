'use client';

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
import Form from 'next/form';
import { parseWithZod } from '@conform-to/zod';
import { useForm } from '@conform-to/react';
import { useActionState } from 'react';
import { onboardingSchemaLocale } from '@/utils/schema';
import { onboardingAction } from '@/lib/actions';
import { SubmitButton } from '@/components/Buttons';

export default function OnboardingRoute() {
  const [lastResult, formAction, isPending] = useActionState(
    onboardingAction,
    undefined,
  );
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchemaLocale });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <div className="flex h-screen items-center justify-center px-5">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl tracking-wider">
            Welcome to&nbsp;
            <span className="rounded-xl bg-primary/20">
              &nbsp;Ske<span className="text-primary">Jule&nbsp;</span>
            </span>
          </CardTitle>
          <CardDescription className="text-md font-bold tracking-wider">
            We need the following information to set up your profile!
          </CardDescription>
        </CardHeader>
        <Form
          id={form.id}
          onSubmit={form.onSubmit}
          action={formAction}
          noValidate
        >
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label className="text-lg">Full Name</Label>
              <Input
                name={fields.fullName.name}
                disabled={isPending}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Lorem Ipsum"
                className="tracking-wider"
              />
              <p className="text-sm font-bold text-destructive">
                {fields.fullName.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="text-lg">username</Label>
              <div className="flex rounded-xl">
                <span className="inline-flex items-center rounded-l-md border-2 border-muted-foreground/20 bg-muted px-3 text-sm font-bold tracking-wider text-muted-foreground">
                  SkeJule.com/
                </span>
                <Input
                  name={fields.username.name}
                  disabled={isPending}
                  key={fields.username.key}
                  defaultValue={fields.username.initialValue}
                  placeholder="example-user-1"
                  className="rounded-l-none tracking-wider"
                />
              </div>
              <p className="text-sm font-bold text-destructive">
                {fields.fullName.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton
              text="Submit"
              variant="ringHover"
              className="w-full"
            />
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
