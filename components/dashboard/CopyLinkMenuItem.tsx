'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';

interface CopyLinkMenuItemProps {
  meetingUrl: string;
}

export default function CopyLinkMenuItem({
  meetingUrl,
}: CopyLinkMenuItemProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success('URL copied to clipboard');
    } catch (err) {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy URL');
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 strokeWidth={3} size={15} />
      <span>Copy</span>
    </DropdownMenuItem>
  );
}
