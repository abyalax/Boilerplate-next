import z from 'zod';
import { Select } from '~/components/fragments/input/select';
import { useNavigate } from '~/components/hooks/use-navigate';
import { useSearch } from '~/components/hooks/use-search';

const schema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

export const Filters = () => {
  const search = useSearch(schema);
  const navigate = useNavigate<Schema>();

  const onChangeName = (value?: string) => {
    console.log(value);

    navigate({
      search(_prev) {
        return {
          ..._prev,
          name: value,
        };
      },
    });
  };

  return [
    <Select
      className="cursor-pointer"
      placeholder="Select Something..."
      key="name"
      option={[
        { label: 'Option 1', value: 'optin_1' },
        { label: 'Option 2', value: 'optin_2' },
        { label: 'Option 3', value: 'optin_3' },
      ]}
      onChange={onChangeName}
      value={search.name}
    />,
  ];
};
