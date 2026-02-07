import { HelpCircle, Home, LayoutDashboard, Notebook, Settings, Table2 } from 'lucide-react';
import { PERMISSIONS } from '~/common/const/permission';
import { MenuGroup, MenuItem } from '~/components/fragments/sidebar/sidebar-app';
import { url } from '~/lib/utils/converter';

export const sidebarItems = (clientId: string): MenuGroup[] => [
  {
    group: 'Client',
    items: [
      {
        title: 'Dashboard',
        url: url('/client/[clientId]/dashboard', { clientId }),
        icon: LayoutDashboard,
        permissions: [PERMISSIONS.CLIENT.READ_CV, PERMISSIONS.CLIENT.READ_CHATS, PERMISSIONS.CLIENT.READ_ANALYZE],
      },
      {
        title: 'Curriculum Vitae',
        url: url('/client/[clientId]/cv', { clientId }),
        icon: Table2,
        permissions: [PERMISSIONS.CLIENT.READ_CV],
      },
      {
        title: 'Messages',
        url: url('/client/[clientId]/messages', { clientId }),
        icon: Table2,
        permissions: [PERMISSIONS.CLIENT.READ_CHATS],
      },
      {
        title: 'Chats',
        url: url('/client/[clientId]/chats', { clientId }),
        icon: Table2,
        permissions: [PERMISSIONS.CLIENT.READ_CHATS],
      },
      {
        title: 'Analyze',
        url: url('/client/[clientId]/analyze', { clientId }),
        icon: Table2,
        permissions: [PERMISSIONS.CLIENT.READ_ANALYZE],
      },
    ],
  },
  {
    group: 'Backoffice',
    items: [
      {
        title: 'Dasboard',
        url: url('/backoffice/dashboard'),
        icon: Home,
        permissions: [PERMISSIONS.ADMIN.READ_CLIENT],
      },
      {
        title: 'Clients',
        url: url('/backoffice/clients'),
        icon: Notebook,
        permissions: [PERMISSIONS.ADMIN.READ_CLIENT],
      },
    ],
  },
];

export const bottomItems: MenuItem[] = [
  {
    title: 'Help & Support',
    url: '/help',
    icon: HelpCircle,
    permissions: [],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    permissions: [],
  },
];
