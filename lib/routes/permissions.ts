// Auto-generated file - do not edit manually
// Generated at: 2025-12-28T03:57:16.180Z

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/[clientId]/cv/': ['cv:read'],
  '/backoffice/clients/': [],
  '/[clientId]/cv/create/': ['cv:read', 'cv:create'],
  '/backoffice/clients/[clientId]/': ['client:read'],
  '/[clientId]/cv/[cvId]/update/': ['cv:read', 'cv:update'],
  '/[clientId]': [],
  '/[clientId]/cv': ['cv:read'],
  '/:clientId/cv/': ['cv:read'],
  '/backoffice': [],
  '/backoffice/clients': [],
  '/[clientId]/cv/create': ['cv:read', 'cv:create'],
  '/:clientId/cv/create/': ['cv:read', 'cv:create'],
  '/backoffice/clients/[clientId]': ['client:read'],
  '/backoffice/clients/:clientId/': ['client:read'],
  '/[clientId]/cv/[cvId]': ['cv:read'],
  '/[clientId]/cv/[cvId]/update': ['cv:read', 'cv:update'],
  '/:clientId/cv/:cvId/update/': ['cv:read', 'cv:update'],
} as const;
