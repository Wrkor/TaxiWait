export const globalConstants = {
	routes: {
		any: '*',
		main: '/',
		account: '/account',
		error404: '/404',
	},
	endPoints: {
		auth: '/api/users',
		phone: '/api/users/code',
		login: '/api/users/auth',
	},
	api: import.meta.env.VITE_API_BACKEND,
  //api: 'http://77.222.60.86:8000',
  view: {
    monitoring: 'monitoring',
    account: 'account',
  },
  panel: {
    map: 'monitoring',
    account: 'account',
    orders: 'orders',
  },
  modal: {
    onboarding: 'onboarding',
    confirmOrders: 'confirmOrders',
    confirmRoad: 'confirmRoad',
    mapRoad: 'mapRoad',
    monitoringRoad: 'monitoringRoad',
    confirmShareOrder: 'confirmShareOrder'
  },
	storage: {
    confirmNotification: 'confirmNotification',
    isWasShowOnboarding: 'isWasShowOnboarding',
    isShareOrder: 'isShareOrder',
	},
  scope: {
    friends:"friends", // Доступ к списку друзей пользователя.
    photos:"photos", // Доступ к фотографиям в профиле пользователя.
    video:"video", // Доступ к видео в профиле пользователя.
    stories:"stories", // Доступ к историям, созданным пользователем.
    pages:"pages", // Доступ к вики-страницам пользователя.
    status:"status", // Доступ к статусу пользователя.
    notes:"notes", // Доступ к заметкам пользователя.
    notify:"notify", // Доступ к заметкам пользователя.
    messages:"messages", // Разрешение на использование API-запросов для работы с сообщениями пользователя.
    wall:"wall", //Возможность использовать API-запросы для работы со стеной пользователя.
    docs:"docs", // Доступ к документам пользователя.
    groups:"groups", //Доступ к информации о сообществах пользователя.
    stats:"stats", // Доступ к статистике сообществ и приложений, которые администрирует пользователь.
    group_messages:"group_messages", // Разрешение на отправку пользователю сообщений от лица сообщества, которое указано как официальное сообщество в настройках мини-приложения или игры.
    market:"market", // Доступ к товарам, добавленным пользователем на платформу.
  },
  app: {
    id: import.meta.env.VITE_APP_ID,
  },
  map: {
    token: "",
    coords: {
      lng: 30.312654,
      lat: 59.933418,
    },
    zoom: 15,
    theme: {
      dark: 'mmr://api/styles/dark_style.json',
      light: 'mmr://api/styles/main_style.json',
    }
  }
}

export default globalConstants