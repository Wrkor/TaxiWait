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
	api: 'http://localhost:3000',
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
    monitoringRoad: 'monitoringRoad',
  },
	storage: {
		confirmOrders: {
			key: 'confirmOrders',
			true: true,
			false: false,
		},
    confirmNotification: {
			key: 'confirmNotification',
			true: true,
			false: false,
		},
	},
  app: {
    id: 52634961,
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