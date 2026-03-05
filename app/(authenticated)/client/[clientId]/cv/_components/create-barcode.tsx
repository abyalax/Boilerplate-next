'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { FC } from 'react';
import { Modal } from '~/components/fragments/modal/modal';
import { Button } from '~/components/ui/button';
import { CV } from '~/modules/cv/cv.type';

type Props = {
  data: CV;
};

export const CreateBarcode: FC<Props> = () => {
  const url = 'http://localhost:3000/qrcode/2/1';

  return (
    <Modal
      title="Barcode"
      textCancel={<Button variant={'outline'}>Cancel</Button>}
      textAction={<Button>Download</Button>}
      textOpen="Create QR Code"
      content={<QRCodeCanvas value={url} size={256} />}
    />
  );
};
