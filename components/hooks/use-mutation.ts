/** biome-ignore-all lint/suspicious/noExplicitAny: <generic use> */
import { QueryClient, UseMutationOptions, useMutation as useReactMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { TAxiosResponse, TResponse } from '~/common/types/response';

type TExtendedMutationOptions<TData, TError, TVariables, TContext> = UseMutationOptions<TData, TError, TVariables, TContext> & {
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
};

export const useMutation = <TData = TResponse<unknown>, TError = TResponse, TVariables = void, TContext = unknown>(
  {
    showSuccessMessage = true,
    showErrorMessage = true,
    onSuccess,
    onError,
    ...restOptions
  }: TExtendedMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient,
) =>
  useReactMutation<TData, TError, TVariables, TContext>(
    {
      ...restOptions,
      onSuccess: (data: TData, variables: TVariables, context: TContext) => {
        onSuccess?.(data, variables, context);
        console.log(data);
        const castData = data as TAxiosResponse;
        toast.success(castData.data.message);
      },
      onError: (error: TError, variables: TVariables, context?: TContext) => {
        onError?.(error, variables, context);
        const castError = error as AxiosError<TResponse>;
        if (showErrorMessage) {
          const message = castError.response?.data.message ?? 'Something went wrong';
          toast.error(message);
        }
      },
    },
    queryClient,
  );
