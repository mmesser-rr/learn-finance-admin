import { lazy } from 'react';

const Opportunities = lazy(() => import('./opportunities/Opportunities'));
const Opportunity = lazy(() => import('./opportunity/Opportunity'));

const PagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/opportunities',
      element: <Opportunities />,
    },
    {
      path: 'pages/opportunities/:opportunityId/*',
      element: <Opportunity />,
    },
  ],
};

export default PagesConfig;
