'use client';

import { MoreHorizontalIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { ClientParams } from '~/common/types/params';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { url } from '~/lib/utils/converter';
import { CV } from '~/modules/cv/cv.type';
import { useDeleteCV } from '../_hooks/use-delete-cv';

type Props = {
  record: CV;
};

export const ActionColumn: FC<Props> = ({ record }) => {
  const { push } = useRouter();
  const { clientId } = useParams<ClientParams>();
  const { mutate: deleteCV } = useDeleteCV(clientId);
  const handleDetail = () => push(url('/[clientId]/cv/[cvId]', { clientId: clientId, cvId: record.id.toString() }));
  const handleUpdate = () => push(url('/[clientId]/cv/[cvId]/update', { clientId: clientId, cvId: record.id.toString() }));
  const handleDelete = () => deleteCV(record.id.toString());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="hover:bg-secondary">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDetail}>Detail</DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
