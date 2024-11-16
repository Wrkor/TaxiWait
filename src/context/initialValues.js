
export const initialValues = {
	user: {
    userInfo: {},
    userGeodata: {},
    userAuthToken: {},
    userLaunchParams: {},
    userAllowedScopes: [],
    vkToken: "",
    sign: "",
    enableBot: false
  },
  snackbar: {
    error: "",
    success: "",
  },
  map: {
    roadFrom: "",
    roadTo: "",
    geocodeFrom: "",
    geocodeTo: "",
    isRoadSelect: false,
  },
  taxi: {
    discount: 20,
    price: 0,
    discountPrice: 0,
    waitPrice: 0,
  },
  monitoring: {
    isMonitoringRun: false,
    isMonitoringSuccess: false,
  }
}

export default initialValues