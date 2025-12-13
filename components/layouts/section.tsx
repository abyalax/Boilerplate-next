import { FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <div className="space-y-4 border p-4 rounded">{children}</div>;
};
