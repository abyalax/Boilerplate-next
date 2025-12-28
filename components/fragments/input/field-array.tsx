'use client';

import { X } from 'lucide-react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Tooltip } from '../modal/tooltip';

interface FieldArrayProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  schema: ZodType;
  name: keyof T & string;
  label: string;
  placeholder?: string;
}

export const FieldArray = <T extends FieldValues>({ placeholder = 'Type and press Enter', ...props }: FieldArrayProps<T>) => {
  const values = props.form.watch(props.name as Path<T>) || [];

  function addValue(value: string) {
    if (!value.trim()) return;
    const trimedValue = value.trim();
    const result = props.schema.safeParse(trimedValue);
    if (!result.success) {
      props.form.setError(props.name as Path<T>, {
        type: 'manual',
        message: result.error.issues[0].message,
      });
      return;
    }
    props.form.clearErrors(props.name as Path<T>);
    props.form.setValue(props.name as Path<T>, [...values, trimedValue] as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  function removeValue(index: number) {
    const next = [...values];
    next.splice(index, 1);
    props.form.setValue(props.name as Path<T>, next as PathValue<T, Path<T>>);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addValue(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </FormControl>

          <div className="flex flex-wrap gap-2 mt-2">
            {values.map((v: string, i: number) => (
              <div key={i} tabIndex={0} className="flex items-center gap-2 bg-muted px-2 py-0.5 rounded">
                <span className="text-sm">{v}</span>
                <Tooltip content={'Remove'}>
                  <X size={12} onClick={() => removeValue(i)} className="cursor-pointer" />
                </Tooltip>
              </div>
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
