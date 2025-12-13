export const navigationClient = (clientId: string) => [
  { name: 'Login', href: `/${clientId}/auth/login` },
  { name: 'Register', href: `/${clientId}/auth/register` },
];

export const navigationAdmin = [
  { name: 'Home', href: '/backoffice' },
  { name: 'Clients', href: '/backoffice/clients' },
  { name: 'Create Client', href: '/clients/create' },
];

export const navigationGuest = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pricing', href: '/pricing' },

  /**Just For Development */
  { name: 'Client', href: '/1' },
  { name: 'Admin', href: '/backoffice' },
];
