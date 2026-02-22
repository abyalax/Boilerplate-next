/** biome-ignore-all lint/style/useNamingConvention: <off> */
export type roles = 'Client' | 'Admin';

export const ROLE = Object.freeze({
  ADMIN: 'Admin',
  CLIENT: 'Client',
} as const);

export const ROLEIDS = Object.freeze({
  Admin: 1,
  Client: 2,
} as const);

export const PERMISSIONS = Object.freeze({
  ADMIN: {
    READ_CLIENT: 'client:read',
    UPDATE_CLIENT: 'client:update',
    CREATE_CLIENT: 'client:create',
    DELETE_CLIENT: 'client:delete',

    SINGLE_ANALYZE_CV: 'cv:single_analyze',
    BULK_ANALYZE_CV: 'cv:bulk_analyze',
    READ_ANALYZE_CV: 'cv:read_analyze',

    READ_CV: 'cv:read',
    UPDATE_CV: 'cv:update',
    CREATE_CV: 'cv:create',
    DELETE_CV: 'cv:delete',

    READ_CHATS: 'chat:read',
    UPDATE_CHATS: 'chat:update',
    CREATE_CHATS: 'chat:create',
    DELETE_CHATS: 'chat:delete',

    READ_MESSAGES: 'messages:read',
    UPDATE_MESSAGES: 'messages:update',
    CREATE_MESSAGES: 'messages:create',
    DELETE_MESSAGES: 'messages:delete',

    READ_AGENT: 'agent:read',
    UPDATE_AGENT: 'agent:update',
    CREATE_AGENT: 'agent:create',
    DELETE_AGENT: 'agent:delete',
  },
  CLIENT: {
    SINGLE_ANALYZE: 'cv:single_analyze',
    BULK_ANALYZE: 'cv:bulk_analyze',
    READ_ANALYZE: 'cv:read_analyze',

    READ_CV: 'cv:read',
    UPDATE_CV: 'cv:update',
    CREATE_CV: 'cv:create',
    DELETE_CV: 'cv:delete',

    READ_CHATS: 'chat:read',
    UPDATE_CHATS: 'chat:update',
    CREATE_CHATS: 'chat:create',
    DELETE_CHATS: 'chat:delete',
  },
} as const);
