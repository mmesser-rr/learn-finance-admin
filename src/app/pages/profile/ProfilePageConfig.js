import { authRoles } from 'app/auth';
import { lazy } from 'react';

const ProfilePage = lazy(() => import('./ProfilePage'));

const ProfilePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'pages/profile',
      element: <ProfilePage />,
    },
  ],
};

export default ProfilePageConfig;
