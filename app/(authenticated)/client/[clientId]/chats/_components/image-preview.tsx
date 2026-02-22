import { ChevronLeftIcon } from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';

type Props = {
  asChild: boolean;
  children: ReactNode;
  images: string | StaticImport;
};

export const ImagePreview: FC<Props> = ({ children, images, asChild }) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="mb-8 flex h-auto min-w-[calc(100vw-4rem)] flex-col justify-between gap-0 p-0">
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Image Preview</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <Image src={images} alt="Preview Image" width={800} height={800} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">
              <ChevronLeftIcon />
              Back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
