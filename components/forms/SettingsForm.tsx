'use client';

import { useActionState, useState } from 'react';
import { SettingsAction } from '@/lib/actions';
import { aboutSettingsSchema } from '@/utils/schema';
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
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { SubmitButton } from '@/components/Buttons';
import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Form from 'next/form';

interface SettingsProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export default function SettingsForm({
  fullName,
  email,
  profileImage,
}: SettingsProps) {
  const [lastResult, formAction, isPending] = useActionState(
    SettingsAction,
    undefined,
  );
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: aboutSettingsSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-wider">
          Settings
        </CardTitle>
        <CardDescription className="font-bold tracking-wide">
          Manage your account settings.
        </CardDescription>
      </CardHeader>
      <Form
        noValidate
        id={form.id}
        onSubmit={form.onSubmit}
        action={formAction}
      >
        <CardContent className="flex flex-col gap-y-4">
          <div className="grid gap-y-5">
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
              disabled={isPending}
            />
            <Label className="text-lg">Profile Image</Label>
            {currentProfileImage ? (
              <div className="relative size-32">
                <Image
                  src={currentProfileImage}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="size-32 rounded-xl"
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  className="absolute inset-x-0 inset-y-24 h-8 w-32 rounded-t-none opacity-0 transition-opacity hover:opacity-100"
                >
                  <Trash2 strokeWidth={3} className="mr-1 size-5" />
                  <p className="font-bold tracking-wider text-base">Delete</p>
                </Button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  container: 'capitalize border-muted-foreground font-bold tracking-wide border-2 bg-background w-72',
                }}
                onClientUploadComplete={(res: any) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success('Profile Image Uploaded');
                }}
                onUploadError={(error: any) => {
                  toast.error(error.message);
                }}
              />
            )}
            <p className="text-sm font-bold text-destructive">
              {fields.profileImage.errors}
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              disabled={isPending}
              placeholder="Lorem Ipsum"
            />
            <p className="text-sm text-destructive">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">Email</Label>
            <Input disabled placeholder="Jan Marshall" defaultValue={email} />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </Form>
    </Card>
  );
}
