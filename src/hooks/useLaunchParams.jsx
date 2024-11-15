import bridge from '@vkontakte/vk-bridge'
import { useEffect, useState } from 'react'
import { useUserContext } from '.'
import { NormalizeError } from '../helpers'

/**
 * Хук, который запрашивает параметры запуска приложения
 */
export const useLaunchParams = () => {
  const [isLaunchParamsLoading, SetLaunchParamsLoading] = useState(true)
  const [launchParamsError, SetLaunchParamsError] = useState(null)

  const { userLaunchParams, SetUserLaunchParams } = useUserContext()

  useEffect(() => {

    const fetching = async () => {
      try {

        const data = await bridge.send('VKWebAppGetLaunchParams')

        // Параметры запуска получены
        
        if (!!data) {
          SetUserLaunchParams(data)
        }
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useLaunchParams: ", e)
        SetLaunchParamsError(NormalizeError('Ошибка получения параметров запуска приложения'))
      }
      finally {
        SetLaunchParamsLoading(false)
      }
    }
    fetching()
  }, [])

  return { isLaunchParamsLoading, launchParamsError, userLaunchParams }
}

export default useLaunchParams