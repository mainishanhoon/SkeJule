import CopyLinkMenuItem from '@/components/dashboard/CopyLinkMenuItem';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import prisma from '@/lib/db';
import requireUser from '@/lib/hooks';
import { Ellipsis, ExternalLink, Pen, Trash2, Users2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EventPage() {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="hidden gap-1 sm:grid">
          <h1 className="font-heading text-3xl font-bold tracking-wide md:text-4xl">
            Event Types
          </h1>
          <p className="text-lg font-bold tracking-wide text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create New Event</Link>
        </Button>
      </div>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no event types"
          description="You can create your first event type by clicking the button below"
          href="/dashboard/new"
          text="Add Event Type"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.EventType.map((item) => (
            <Card
              className="relative overflow-hidden rounded-lg border-2 shadow dark:border-muted-foreground"
              key={item.id}
            >
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Ellipsis className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20" align="center">
                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/${data.username}/${item.url}`}>
                          <ExternalLink strokeWidth={3} size={15} />
                          <span>Preview</span>
                        </Link>
                      </DropdownMenuItem>
                      <CopyLinkMenuItem
                        meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${item.url}`}
                      />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/event/${item.id}`}>
                          <Pen strokeWidth={3} size={15} />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/event/${item.id}/delete`}
                        className="bg-destructive text-white"
                      >
                        <Trash2 strokeWidth={3} size={15} />
                        <span>Delete</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link href={`/dashboard/event/${item.id}`}>
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users2 size={35} aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-md truncate font-bold tracking-wide">
                          {item.duration} Minutes Meeting
                        </dt>
                        <dd>
                          <div className="text-2xl font-bold tracking-wide">
                            {item.title}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between bg-gray-300 px-5 py-3 dark:bg-gray-900 dark:bg-muted-foreground/50">
                <Link href={`/dashboard/event/${item.id}`}>
                  <Button className="tracking-wider">Edit Event</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
