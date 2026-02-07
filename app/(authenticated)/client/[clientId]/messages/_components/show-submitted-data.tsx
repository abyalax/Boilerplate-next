import { toast } from 'sonner';

export function showSubmittedData(data: unknown, title: string = 'You submitted the following values:') {
  toast.message(title, {
    description: (
      <pre className="mt-2 w-[340px] text-wrap overflow-x-auto rounded-md p-4">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}
