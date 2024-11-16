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
  const enableBot = userContext?.user?.enableBot

  const sign = userContext?.user?.sign
  const vkToken = userContext?.user?.vkToken

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

  const SetEnableBot = (value) => {
		userContext?.SetUser(prev => ({
      ...prev,
      enableBot: value,
    }))
	}
  
	return {userContext, userInfo, userGeodata, userAuthToken, userLaunchParams, userAllowedScopes, sign, vkToken, enableBot, SetUserAllowedScopes, SetUserAuthToken, SetUserGeodata, SetUserLaunchParams, SetUserInfo, SetEnableBot}
}

export default useUserContext