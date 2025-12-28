'use client';

import { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  children: ReactNode;
};

export const RenderMarkdown: FC<Props> = ({ children }) => {
  return (
    <div className="prose">
      <ReactMarkdown>{children as string}</ReactMarkdown>
    </div>
  );
};
