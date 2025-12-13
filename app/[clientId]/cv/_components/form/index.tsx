'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { FallBack } from '~/components/fragments/fallback';
import { ArrayInputField } from '~/components/fragments/input/array-input';
import { ObjectArrayField } from '~/components/fragments/input/object-field';
import { Section } from '~/components/layouts/section';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { cvSchema, FormDataCV } from './schema';

interface FormProps {
  initialValues?: FormDataCV;
  onSubmit: (_data: FormDataCV) => void;
  isLoading?: boolean;
  buttonText?: string;
}

export const FormCV: FC<FormProps> = ({ onSubmit, initialValues, isLoading = false, buttonText = 'Submit' }) => {
  const form = useForm<FormDataCV>({
    resolver: zodResolver(cvSchema),
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  return (
    <Suspense fallback={<FallBack />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ArrayInputField form={form} name="interest" label="Interest" />
          <ArrayInputField form={form} name="skill" label="Skill" />

          <Section>
            <ObjectArrayField
              form={form}
              name="education"
              label="Education"
              shape={{
                name: { label: 'School Name', type: 'text' },
                major: { label: 'Major', type: 'text' },
              }}
            />
          </Section>

          <Section>
            <ObjectArrayField
              form={form}
              name="experience"
              label="Experience"
              shape={{
                role: { label: 'Role' },
                company: { label: 'Company' },
                description: { label: 'Description', type: 'textarea' },
                start: { label: 'Start Date' },
                end: { label: 'End Date' },
              }}
            />
          </Section>

          <Section>
            <ObjectArrayField
              form={form}
              name="projects"
              label="Projects"
              shape={{
                title: { label: 'Title' },
                description: { label: 'Description', type: 'textarea' },
              }}
            />
          </Section>

          <Section>
            <ObjectArrayField
              form={form}
              name="certificate"
              label="Certificate"
              shape={{
                title: { label: 'Title' },
                issuer: { label: 'Issuer' },
                year: { label: 'Year', type: 'number' },
                url: { label: 'URL' },
              }}
            />
          </Section>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : buttonText}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};
