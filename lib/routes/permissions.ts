// Auto-generated file - do not edit manually
// Generated at: 2026-01-07T13:40:14.877Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/[clientId]': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
  '/backoffice': ['client:read', 'client:create', 'client:delete', 'client:update'],
  '/:clientId': ['cv:read', 'cv:create', 'cv:update', 'cv:delete'],
} as const;
