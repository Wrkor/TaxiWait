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
  const userAllowedScopes = userContext?.user?.userAllowedScopes
  const userData = userContext?.user?.userData

  const isCheckModalVerify = userContext?.user?.isCheckModalVerify
  const sign = userContext?.user?.sign
  const vkToken = userContext?.user?.vkToken

  const SetCheckModalVerify = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      isCheckModalVerify: value,
    }))
	}

  const SetUserAllowedScopes = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userAllowedScopes: value,
    }))
	}

  const SetUserAuthToken = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userAuthToken: value,
    }))
  }

  const SetUserGeodata = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userGeodata: value,
    }))
	}

  const SetUserLaunchParams = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userLaunchParams: value,
      vkToken:  btoa(new URLSearchParams(value).toString()),
      sign:  btoa(value),
    }))
	}

  const SetUserInfo = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userInfo: value,
    }))
	}

  const SetUserData = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      userData: value,
    }))
	}
  
	return {userContext, userInfo, userGeodata, userAuthToken, userLaunchParams, userAllowedScopes, sign, vkToken, userData, isCheckModalVerify, SetUserAllowedScopes, SetUserAuthToken, SetUserGeodata, SetUserLaunchParams, SetUserInfo, SetUserData, SetCheckModalVerify}
}

export default useUserContext