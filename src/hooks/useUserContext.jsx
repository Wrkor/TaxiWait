import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

/**
 * Хук, который содержит информацию о пользователе
 */
export const useUserContext = () => {
  const userContext = useContext(UserContext)
	
  const userInfo = userContext?.user?.userInfo
  const userGeodata = userContext?.user?.userGeodata
  const userAuthToken = userContext?.user?.userAuthToken
  const userLaunchParams = userContext?.user?.userLaunchParams

  const sign =  btoa(userLaunchParams)
  const vkToken =  btoa(new URLSearchParams(userLaunchParams).toString())

  const SetUserAllowedScopes = (value) => {
		userContext?.SetUser({
      ...userContext?.user,
      allowedScopes: value,
    })
	}

  const SetAuthToken = (value) => {
		userContext?.SetUser({
      ...userContext?.user,
      userAuthToken: value,
    })
	}

  const SetGeodata = (value) => {
		userContext?.SetUser({
      ...userContext?.user,
      userGeodata: value,
    })
	}

  const SetLaunchParams = (value) => {
		userContext?.SetUser({
      ...userContext?.user,
      userLaunchParams: value,
    })
	}

  const SetUserInfoActive = (value) => {
		userContext?.SetUser({
      ...userContext?.user,
      userInfo: value,
    })
	}
  
	return {userContext, userInfo, userGeodata, userAuthToken, userLaunchParams, sign, vkToken, SetUserAllowedScopes, SetAuthToken, SetGeodata, SetLaunchParams, SetUserInfoActive}
}

export default useUserContext