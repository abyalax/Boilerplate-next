'use client';

import { FC } from 'react';
import { Section } from '~/components/layouts/section';
import { Conversations } from './conversations';

export const Component: FC = () => {
  return (
    <Section className="h-[80vh] overflow-y-scroll">
      <Conversations />
    </Section>
  );
};
