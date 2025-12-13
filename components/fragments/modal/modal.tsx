'use client';

import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { FC, isValidElement, ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';

type Props = {
  openOn?: 'click' | 'hover';
  iconOpen?: ReactNode;

  textOpen?: string;
  textCancel?: ReactNode;
  textAction?: ReactNode;

  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
} & AlertDialogProps;

export const Modal: FC<Props> = ({ openOn = 'click', textCancel = 'Cancel', textAction = 'Continue', ...props }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (openOn === 'hover') setOpen(true);
  };

  const handleMouseLeave = () => {
    if (openOn === 'hover') setOpen(false);
  };

  return (
    <AlertDialog {...props} open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cursor-pointer" variant={'outline'}>
          {props.iconOpen}
          {props.textOpen}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        {props.content}
        <AlertDialogFooter>
          <AlertDialogCancel asChild={isValidElement(textCancel)}>{textCancel}</AlertDialogCancel>
          <AlertDialogAction asChild={isValidElement(textAction)}>{textAction}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
