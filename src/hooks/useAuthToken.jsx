import bridge from '@vkontakte/vk-bridge'
import { useEffect, useState } from 'react'
import globalConstants from '../config/globalConstants'
import { NormalizeError } from '../helpers'
import { useUserContext } from './'

/**
 * Хук, который запрашивает токен
 */
export const useAuthToken = () => {
  const [isAuthTokenLoading, SetAuthTokenLoading] = useState(true)
  const [authTokenError, SetAuthTokenError] = useState(null)

  const { userInfo, userAuthToken, SetUserAuthToken } = useUserContext()

  useEffect(() => {
    if (!userInfo) {
      SetAuthTokenLoading(false)
      return
    }

    const fetching = async () => {
      const scopes = [globalConstants.scope.group_messages, globalConstants.scope.friends].join(",")

      try {

        const data = await bridge.send('VKWebAppGetAuthToken', {
          app_id: Number(globalConstants.app.id), 
          scope: scopes,
        })

        // Токен получен

        if (!!data) {
          SetUserAuthToken(data)
        }
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useAuthToken: ", e)
        SetAuthTokenError(NormalizeError('Ошибка получения токена'))
      }
      finally {
        SetAuthTokenLoading(false)
      }
    }
    fetching()
  }, [userInfo])

  return { isAuthTokenLoading, authTokenError, userAuthToken }
}

export default useAuthToken