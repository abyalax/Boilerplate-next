// Auto-generated file - do not edit manually
// Generated at: 2026-02-07T09:41:42.312Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/client/[clientId]/messages': ['chat:read'],
  '/client/[clientId]/cv': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
  '/client': [],
  '/client/[clientId]': [],
  '/client/:clientId/messages': ['chat:read'],
  '/client/:clientId/cv': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
} as const;
