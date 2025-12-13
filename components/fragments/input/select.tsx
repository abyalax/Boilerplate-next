import * as SelectPrimitive from '@radix-ui/react-select';
import { CircleX } from 'lucide-react';
import { FC } from 'react';
import { Select as SelectComponent, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

type Props = {
  onChange: (value?: string) => void;
  value?: string;
  placeholder: string;
  className?: string;
  size?: 'sm' | 'default';
  option: {
    label: string;
    value: string;
  }[];
} & React.ComponentProps<typeof SelectPrimitive.Root>;

export const Select: FC<Props> = (props) => {
  return (
    <div className="relative inline-block">
      <SelectComponent value={props.value} defaultValue={props.value} onValueChange={props.onChange} {...props}>
        <SelectTrigger className="min-w-[250px]">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.option.map((e, index) => (
            <SelectItem key={index} value={e.value}>
              {e.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectComponent>
      {props.value && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onChange(undefined);
          }}
          className="z-20 absolute right-2 top-2 transalate-y-[-50%] cursor-pointer text-muted-foreground bg-white"
        >
          <CircleX size={18} />
        </div>
      )}
    </div>
  );
};
