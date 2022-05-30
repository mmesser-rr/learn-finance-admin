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
