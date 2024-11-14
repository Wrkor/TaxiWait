import bridge from '@vkontakte/vk-bridge'
import { useEffect, useState } from 'react'
import { useUserContext } from '.'
import { normalizeError } from '../helpers'

/**
 * Хук, который запрашивает данные пользователя
 */
export const useUserInfo = () => {
  const [isUserInfoLoading, SetUserInfoLoading] = useState(true)
  const [userInfoError, SetUserInfoError] = useState(null)
  const [userInfo, SetUserInfo] = useState({})

  const { SetUserInfoActive } = useUserContext()

  useEffect(() => {
    SetUserInfoActive(userInfo)
  }, [userInfo])

  useEffect(() => {

    const fetching = async () => {
      try {

        const data = await bridge.send('VKWebAppGetUserInfo')

        // Данные пользователя получены

        if (!!data) {
          SetUserInfo(data)
        }
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useGeodata: ", e)
        SetUserInfoError(normalizeError('Ошибка получения данных пользователя'))
      }
      finally {
        SetUserInfoLoading(false)
      }
    }
    fetching()
  }, [])

  return { userInfo, isUserInfoLoading, userInfoError }
}

export default useUserInfo