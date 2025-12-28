// @ts-ignore force, cause this for generic use
/** biome-ignore-all lint/suspicious/noTsIgnore: > */

import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

interface FieldConfig {
  label: string;
  type?: 'text' | 'textarea' | 'number';
}

interface FieldObjectArrayProps<T extends FieldValues, O extends object> {
  form: UseFormReturn<T>;
  name: keyof T & string;
  label: string;
  shape: { [K in keyof O]: FieldConfig };
}

export const FieldObjectArray = <T extends FieldValues, O extends object>({
  form,
  name,
  label,
  shape,
}: FieldObjectArrayProps<T, O>) => {
  const items = form.watch(name as Path<T>) || [];

  function addItem() {
    const empty = {};
    Object.keys(shape).forEach((key) => {
      // @ts-ignore
      empty[key] = '';
    });
    form.setValue(name as Path<T>, [...items, empty] as PathValue<T, Path<T>>);
  }

  function removeItem(index: number) {
    const next = [...items];
    next.splice(index, 1);
    form.setValue(name as Path<T>, next as PathValue<T, Path<T>>);
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <div className="space-y-4">
        {items.map((_, index: number) => (
          <div key={index} className="border p-4 rounded space-y-2">
            {Object.entries(shape).map(([key, _config]) => {
              const config = _config as FieldConfig;
              return (
                <FormField
                  control={form.control}
                  key={key}
                  name={`${name}.${index}.${key}` as Path<T>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{config.label}</FormLabel>
                      <FormControl>
                        {config.type === 'textarea' ? (
                          <Textarea {...field} />
                        ) : config.type === 'number' ? (
                          <Input
                            type="number"
                            value={field.value ?? ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === '' ? undefined : Number(value));
                            }}
                          />
                        ) : (
                          <Input type={config.type ?? 'text'} {...field} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>
              Remove
            </Button>
          </div>
        ))}

        <Button type="button" variant="secondary" onClick={addItem}>
          Add {label}
        </Button>
      </div>

      <FormMessage />
    </FormItem>
  );
};
