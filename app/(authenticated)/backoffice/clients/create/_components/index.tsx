'use client';

import { FC } from 'react';
import { Flex } from '~/components/layouts/flex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FormClient } from '../../_components/form';
import { FormDataClient } from '../../_components/form/schema';

export const Component: FC = () => {
  const handleSubmit = (data: FormDataClient) => {
    console.log(data);
  };

  return (
    <Flex className="flex-1 items-center justify-center">
      <Card className="shadow-md lg:max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Please provide basic details for the new client.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormClient onSubmit={handleSubmit} buttonText="Create Client" />
        </CardContent>
      </Card>
    </Flex>
  );
};
