'use client';

import { FC } from 'react';
import { Section } from '~/components/layouts/section';
import { ChatInterface } from './chat-interface';

export const Component: FC = () => {
  return (
    <Section className="h-[80vh] overflow-y-scroll">
      <ChatInterface />
    </Section>
  );
};
