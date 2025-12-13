import { ExtractString } from '~/lib/utils';

export const QUERY_KEY = {
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
    LOGOUT: 'logout',
    FORGOT_PASSWORD: 'forgot_password',
    RESET_PASSWORD: 'reset_password',
  },
  CV: {
    GETS: 'get_cvs',
    GET_BY_ID: 'get_cv_by_id',

    CREATE: 'create_cv',
    UPDATE: 'update_cv',
    DELETE: 'delete_cv',
  },
  CLIENT: {
    GETS: 'get_clients',
    GET_BY_ID: 'get_client_by_id',

    CREATE: 'create_client',
    UPDATE: 'update_client',
    DELETE: 'delete_client',
  },
} as const;

export type QueryKey<T = string> = ExtractString<typeof QUERY_KEY> & T;
