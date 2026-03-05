// Auto-generated file - do not edit manually
// Generated at: 2026-03-05T04:38:14.215Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/client/[clientId]/messages': ['chat:read'],
  '/client/[clientId]/cv': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
  '/client': [],
  '/client/[clientId]': [],
  '/client/:clientId/messages': ['chat:read'],
  '/client/:clientId/cv': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
} as const;
