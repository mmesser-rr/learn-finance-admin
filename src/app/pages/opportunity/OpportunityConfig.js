import { lazy } from 'react';

const AddOpportunityPage = lazy(() => import('./add/AddOpportunityPage'));
const Opportunities = lazy(() => import('./opportunities/Opportunities'));

const AddOpportunityPageConfig = {
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
      path: 'pages/opportunity/add',
      element: <AddOpportunityPage />,
    },
  ],
};

export default AddOpportunityPageConfig;
