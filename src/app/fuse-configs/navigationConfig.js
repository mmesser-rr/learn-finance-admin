import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'whatshot',
        url: 'example',
      },
      {
        id: 'opportunities',
        title: 'Opportunities',
        translate: 'OPPORTUNITIES',
        type: 'item',
        icon: 'whatshot',
        url: 'pages/opportunities',
        end: true,
      },
      {
        id: 'opportunity-details',
        title: 'Opportunity Detail',
        translate: 'OPPORTUNITIES',
        type: 'item',
        url: 'pages/opportunities/id',
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
        id: 'profile',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: 'pages/profile',
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'pages',
    children: [
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'lock',
        badge: {
          title: 10,
          bg: '#525E8A',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: 'authentication-login',
            title: 'Login',
            type: 'item',
            url: 'pages/auth/login',
          },
          {
            id: 'login-v2',
            title: 'Login v2',
            type: 'item',
            url: 'pages/auth/login-2',
          },
          {
            id: 'login-v3',
            title: 'Login v3',
            type: 'item',
            url: 'pages/auth/login-3',
          },
          {
            id: 'authentication-register',
            title: 'Register',
            type: 'item',
            url: 'pages/auth/register',
          },
          {
            id: 'authentication-register-v2',
            title: 'Register v2',
            type: 'item',
            url: 'pages/auth/register-2',
          },
          {
            id: 'authentication-register-v3',
            title: 'Register v3',
            type: 'item',
            url: 'pages/auth/register-3',
          },
          {
            id: 'authentication-forgot-password',
            title: 'Forgot Password',
            type: 'item',
            url: 'pages/auth/forgot-password',
          },
          {
            id: 'authentication-forgot-password-v2',
            title: 'Forgot Password v2',
            type: 'item',
            url: 'pages/auth/forgot-password-2',
          },
          {
            id: 'authentication-reset-password',
            title: 'Reset Password',
            type: 'item',
            url: 'pages/auth/reset-password',
          },
          {
            id: 'authentication-reset-password-v2',
            title: 'Reset Password v2',
            type: 'item',
            url: 'pages/auth/reset-password-2',
          },
          {
            id: 'authentication-lock-screen',
            title: 'Lock Screen',
            type: 'item',
            url: 'pages/auth/lock',
          },
          {
            id: 'authentication-mail-confirmation',
            title: 'Mail Confirmation',
            type: 'item',
            url: 'pages/auth/mail-confirm',
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
