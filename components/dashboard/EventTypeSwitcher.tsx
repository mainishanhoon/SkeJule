'use client';

import { Switch } from '@/components/ui/switch';
import { UpdateEventTypeStatusAction } from '@/lib/actions';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { undefined } from 'zod';

interface SwitchProps {
  initialChecked: boolean;
  eventTypeId: string;
}

export function MenuActiveSwitch({ initialChecked, eventTypeId }: SwitchProps) {
  const [isPending, startTrasition] = useTransition();

  const [state, action] = useActionState(UpdateEventTypeStatusAction, null);

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message);
    } else if (state?.status === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTrasition(() => {
          action({ eventTypeId: eventTypeId, isChecked: isChecked });
        });
      }}
    />
  );
}
