import { EditEventTypeForm } from '@/components/forms/EditEventTypeForm';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
export default async function EditEventTypePage({
  params,
}: {
  params: Promise<{ eventTypeId: string }>;
}){
    const resolvedParams = await params;

  const data = await getData(resolvedParams.eventTypeId);

  return (
    <EditEventTypeForm
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.videoCallSoftware}
    />
  );
};
