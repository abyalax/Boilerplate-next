'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { DescriptionItem, Descriptions } from '~/components/fragments/descriptions/descriptions';
import { Flex } from '~/components/layouts/flex';
import { Main } from '~/components/layouts/main';
import { Badge } from '~/components/ui/badge';
import { P } from '~/components/ui/typography';
import { useGetCV } from '../../_hooks/use-get-cv';

type Params = Awaited<PageProps<'/client/[clientId]/cv/[cvId]'>['params']>;

export const Component: FC = () => {
  const { clientId, cvId } = useParams<Params>();
  const { data } = useGetCV(clientId, cvId);

  const descriptionItems: DescriptionItem[] = [
    { label: 'Name', children: data?.name },
    { label: 'Email', children: data?.email },
    { label: 'Linkedin', children: data?.linkedin },
    { label: 'Address', children: data?.address },
    { label: 'About', children: data?.about },
    { label: 'Interest', children: data?.interests[0].name },
    {
      label: 'Skill',
      children: (
        <Flex>
          {data?.skills.map((item) => (
            <Badge variant={'secondary'} key={item.skill.id}>
              {item.skill.name}
            </Badge>
          ))}
        </Flex>
      ),
    },
    {
      label: 'Experience',
      children: (
        <Flex direction="column">
          {data?.experiences?.map((item) => (
            <Flex key={item.company} direction="column">
              <P className="m-0">{item.role}</P>
              <P className="m-0">{item.company}</P>
              <P className="m-0">{item.description}</P>
              <P className="m-0">
                {item.startDate} - {item.endDate}
              </P>
            </Flex>
          ))}
        </Flex>
      ),
    },
    { label: 'Education', children: data?.educations[0].field },
  ];

  return (
    <Main fixed>
      <Descriptions bordered column={2} title="CV" items={descriptionItems} />
    </Main>
  );
};
