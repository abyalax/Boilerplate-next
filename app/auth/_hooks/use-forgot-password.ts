import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { forgotPassword } from '~/data/auth/auth.api';

type Payload = { email: string };

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.AUTH.FORGOT_PASSWORD],
    mutationFn: async (payload: Payload) => await forgotPassword(payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => toast.success('Send Email Reset Password, check your email'),
    onError: (error: AxiosError<TResponse>) => {
      console.log('useForgotPassword error : ', error);
      const message = error.response?.data.message ?? 'Failed to request forgot password';
      toast.error(message);
    },
  });
};
