import {
  createHashRouter,
} from '@vkontakte/vk-mini-apps-router'
import globalConstants from './config/globalConstants'

export const router = createHashRouter([
  {
    path: '/',
    panel: globalConstants.panel.map,
    view: globalConstants.view.monitoring,
  },
  {
    path: '/account',
    panel: globalConstants.panel.account,
    view: globalConstants.view.account,
  },
  {
    path: '/account/orders',
    panel: globalConstants.panel.orders,
    view: globalConstants.view.account,
  },
]);
