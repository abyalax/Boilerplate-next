'use client';

import { X } from 'lucide-react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Tooltip } from '../modal/tooltip';

interface ArrayInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T & string;
  label: string;
  placeholder?: string;
}

export const ArrayInputField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = 'Type and press Enter',
}: ArrayInputFieldProps<T>) => {
  const values = form.watch(name as Path<T>) || [];

  function addValue(value: string) {
    if (!value.trim()) return;
    form.setValue(name as Path<T>, [...values, value.trim()] as PathValue<T, Path<T>>);
  }

  function removeValue(index: number) {
    const next = [...values];
    next.splice(index, 1);
    form.setValue(name as Path<T>, next as PathValue<T, Path<T>>);
  }

  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
