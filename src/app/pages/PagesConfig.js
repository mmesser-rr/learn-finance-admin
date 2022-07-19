import { lazy } from "react";
import { authRoles } from "app/auth";

const Opportunities = lazy(() => import("./opportunities/Opportunities"));
const Opportunity = lazy(() => import("./opportunity/Opportunity"));
const OpportunityPage = lazy(() => import("./opportunity/OpportunityPage"));
const ProfilePage = lazy(() => import("./profile/ProfilePage"));
const Events = lazy(() => import("./events/Events"));
const Event = lazy(() => import("./event/Event"));
const EventPage = lazy(() => import("./event/EventPage"));

const PagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "pages/opportunities",
      element: <Opportunities />,
    },
    {
      path: "pages/opportunities/:id/*",
      element: <Opportunity />,
    },
    {
      path: "pages/opportunity/:id/*",
      element: <OpportunityPage />,
    },
    {
      path: "pages/profile",
      element: <ProfilePage />,
    },
    {
      path: "pages/profile/:id/*",
      element: <ProfilePage />,
    },
    {
      path: "pages/events",
      element: <Events />,
    },
    {
      path: "pages/events/:id/*",
      element: <Event />,
    },
    {
      path: "pages/event/:id/*",
      element: <EventPage />,
    }
  ],
};

export default PagesConfig;
