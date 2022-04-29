import { lazy } from 'react';
import { authRoles } from 'app/auth';

const Opportunities = lazy(() => import('./opportunities/Opportunities'));
const Opportunity = lazy(() => import('./opportunity/Opportunity'));
const ProfilePage = lazy(() => import('./profile/ProfilePage'));

const PagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'pages/opportunities',
      element: <Opportunities />,
    },
    {
      path: 'pages/opportunities/:id/*',
      element: <Opportunity />,
    },
    {
      path: 'pages/profile',
      element: <ProfilePage />,
    },
    {
      path: 'pages/profile/:id/*',
      element: <ProfilePage />,
    },
  ],
};

export default PagesConfig;
