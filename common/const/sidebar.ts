import { Gpu, HelpCircle, History, Home, LayoutDashboard, ListTodo, Notebook, SaveAll, Settings, Table2 } from 'lucide-react';
import { PERMISSIONS } from '~/common/const/permission';
import { MenuGroup, MenuItem } from '~/components/fragments/sidebar/sidebar-app';
import { url } from '~/lib/utils/converter';

export const sidebarItems = (clientId: string): MenuGroup[] => [
  {
    group: 'Client',
    items: [
      {
        title: 'Dashboard',
        url: url('/[clientId]/dashboard', { clientId }),
        icon: LayoutDashboard,
        permissions: [PERMISSIONS.CLIENT.READ_ANALYZE],
      },
      {
        title: 'Analyze CV',
        url: url('/[clientId]/analyze', { clientId }),
        icon: Gpu,
        permissions: [PERMISSIONS.CLIENT.READ_ANALYZE], //  TODO:  Adjust to only ANALYZE
      },
      {
        title: 'Job Descriptions',
        url: `/${clientId}/jobs`,
        icon: ListTodo,
        permissions: [PERMISSIONS.CLIENT.READ_JOBDESC],
      },
      {
        title: 'Histories',
        url: `/${clientId}/histories`,
        icon: History,
        permissions: [PERMISSIONS.CLIENT.READ_ANALYZE],
      },
      {
        title: 'Saved CV',
        url: `/${clientId}/saved`,
        icon: SaveAll,
        permissions: [PERMISSIONS.CLIENT.READ_CV],
      },
      {
        title: 'Manage CV',
        url: url('/[clientId]/cv', { clientId }),
        icon: Table2,
        permissions: [PERMISSIONS.CLIENT.READ_CV],
      },
    ],
  },
  {
    group: 'Admin',
    items: [
      {
        title: 'Beranda',
        url: `/${clientId}`,
        icon: Home,
        permissions: [PERMISSIONS.ADMIN.READ_CLIENT],
      },
      {
        title: 'Admin',
        url: `/${clientId}/admin`,
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
