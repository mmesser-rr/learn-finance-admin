import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'opportunities',
    title: 'Opportunities',
    translate: 'OPPORTUNITIES',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'opportunities',
        title: 'Opportunities',
        translate: 'OPPORTUNITIES',
        type: 'item',
        icon: 'insights',
        url: 'pages/opportunities',
        end: true,
      },
      {
        id: 'new-opportunity',
        title: 'Add Opportunity',
        translate: 'NEW_OPPORTUNITY',
        type: 'item',
        icon: 'add',
        url: 'pages/opportunities/new',
      },
      {
        id: 'events',
        title: 'Events',
        translate: 'EVENTS',
        type: 'item',
        icon: 'insights',
        url: 'pages/events',
        end: true
      },
      {
        id: 'new-event',
        title: 'Add Event',
        translate: 'NEW_EVENT',
        type: 'item',
        icon: 'add',
        url: 'pages/events/new',
      },
      {
        id: 'learns',
        title: 'Learns',
        translate: 'LEARNS',
        type: 'item',
        icon: 'insights',
        url: 'pages/learns',
        end: true
      },
      {
        id: 'new-learn',
        title: 'Add Learn',
        translate: 'NEW_LEARN',
        type: 'item',
        icon: 'add',
        url: 'pages/learns/new',
      },
      {
        id: 'rewards',
        title: 'Rewards',
        translate: 'REWARDS',
        type: 'item',
        icon: 'insights',
        url: 'pages/rewards',
        end: true
      },
      {
        id: 'new-reward',
        title: 'Add Reward',
        translate: 'NEW_REWARD',
        type: 'item',
        icon: 'add',
        url: 'pages/rewards/new',
      },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    type: 'group',
    icon: 'users',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: 'pages/profile',
      },
    ],
  },
];

export default navigationConfig;
