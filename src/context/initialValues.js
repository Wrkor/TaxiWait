
export const initialValues = {
	user: {
    userInfo: {},
    userGeodata: {},
    userAuthToken: {},
    userLaunchParams: {},
    userAllowedScopes: [],
    vkToken: "",
    sign: "",
    isCheckModalVerify: false,
    userBot: false
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
    isContinue: false,
  }
}

export default initialValues