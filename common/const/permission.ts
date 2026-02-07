/** biome-ignore-all lint/style/useNamingConvention: <off> */
export type roles = 'Client' | 'Admin';

export const ROLE = Object.freeze({
  CLIENT: 'Client',
  ADMIN: 'Admin',
} as const);

export const ROLEIDS = Object.freeze({
  Client: 1,
  Admin: 2,
} as const);

export const PERMISSIONS = Object.freeze({
  CLIENT: {
    SINGLE_ANALYZE: 'cv:single_analyze',
    BULK_ANALYZE: 'cv:bulk_analyze',
    READ_ANALYZE: 'cv:read_analyze',

    READ_CV: 'cv:read',
    UPDATE_CV: 'cv:update',
    CREATE_CV: 'cv:create',
    DELETE_CV: 'cv:delete',

    CREATE_JOBDESC: 'jobdesc:create',
    READ_JOBDESC: 'jobdesc:read',
    UPDATE_JOBDESC: 'jobdesc:update',
    DELETE_JOBDESC: 'jobdesc:delete',

    READ_HISTORIES: 'histories:read',
    UPDATE_HISTORIES: 'histories:update',
    CREATE_HISTORIES: 'histories:create',
    DELETE_HISTORIES: 'histories:delete',

    READ_CHATS: 'chat:read',
    UPDATE_CHATS: 'chat:update',
    CREATE_CHATS: 'chat:create',
    DELETE_CHATS: 'chat:delete',
  },
  ADMIN: {
    READ_CLIENT: 'client:read',
    UPDATE_CLIENT: 'client:update',
    CREATE_CLIENT: 'client:create',
    DELETE_CLIENT: 'client:delete',
  },
} as const);
