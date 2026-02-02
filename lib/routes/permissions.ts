// Auto-generated file - do not edit manually
// Generated at: 2026-02-02T15:42:02.301Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/[clientId]': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
  '/backoffice': ['client:read', 'client:create', 'client:delete', 'client:update'],
  '/:clientId': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
} as const;
