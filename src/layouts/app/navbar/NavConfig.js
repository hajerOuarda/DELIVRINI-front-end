// components
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),

  restaurant: <Iconify icon={'ic:baseline-table-restaurant'} color="#DF3E30" width={32} height={32} />,
  element: <Iconify icon={'healthicons:hot-meal'} color="#DF3E30" width={32} height={32} />

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: '/dashboard/app', icon: ICONS.dashboard },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // E-COMMERCE
      {
        title: 'e-commerce',
        path: '/app/e-commerce',
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: '/app/e-commerce', role: 'client' },
          { title: 'list', path: '/app/e-commerce/list-product', role: 'admin' },
          { title: 'checkout', path: '/app/e-commerce/checkout', role: 'client' },
        ],
      },
    ]
  }
];

export default navConfig;
