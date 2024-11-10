'use server';

import prisma from '@/lib/db';
import requireUser from '@/lib/hooks';
import { parseWithZod } from '@conform-to/zod';
import {
  onboardingSchema,
  aboutSettingsSchema,
  EventTypeServerSchema,
} from '@/utils/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { nylas } from '@/lib/nylas';

export async function onboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchema({
      async isUsernameUnique() {
        const exisitngSubDirectory = await prisma.user.findUnique({
          where: {
            username: formData.get('username') as string,
          },
        });
        return !exisitngSubDirectory;
      },
    }),

    async: true,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const OnboardingData = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      username: submission.value.username,
      name: submission.value.fullName,
      Availability: {
        createMany: {
          data: [
            {
              day: 'Monday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Tuesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Wednesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Thursday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Friday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Saturday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
          ],
        },
      },
    },
  });

  return redirect('/onboarding/grant-id');
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: aboutSettingsSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session.user?.id as string,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect('/dashboard');
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith('id-'))
    .map((key) => {
      const id = key.replace('id-', '');
      return {
        id,
        isActive: rawData[`isActive-${id}`] === 'on',
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: { id: item.id },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        }),
      ),
    );

    revalidatePath('/dashboard/availability');
  } catch (error) {
    console.error(error);
  }
}

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData,
) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: EventTypeServerSchema({
      async isUrlUnique() {
        const data = await prisma.eventType.findFirst({
          where: {
            userId: session.user?.id,
            url: formData.get('url') as string,
          },
        });
        return !data;
      },
    }),

    async: true,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      userId: session.user?.id as string,
      videoCallSoftware: submission.value.videoCallSoftware,
    },
  });

  return redirect('/dashboard');
}

export async function CreateMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: { username: formData.get('username') as string },
    select: { grantEmail: true, grantId: true },
  });

  if (!getUserData) {
    throw new Error('User not Found');
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: { id: formData.get('eventTypeId') as string },
    select: { title: true, description: true },
  });

  const fromTime = formData.get('fromTime') as string;
  const eventDate = formData.get('eventDate') as string;
  const meetingLength = Number(formData.get('meetingLength'));
  const provider = formData.get('provider') as string;

  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);

  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  await nylas.events.create({
    identifier: getUserData.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: { autocreate: {}, provider: provider as any },
      participants: [
        {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          status: 'yes',
        },
      ],
    },
    queryParams: {
      calendarId: getUserData.grantEmail as string,
      notifyParticipants: true,
    },
  });
  return redirect('/success');
}