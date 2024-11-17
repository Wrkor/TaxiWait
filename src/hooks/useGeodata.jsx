import bridge from '@vkontakte/vk-bridge'
import { useEffect, useState } from 'react'
import { useUserContext } from '.'
import { NormalizeError } from '../helpers'

/**
 * Хук, который запрашивает геоданные
 */
export const useGeodata = () => {
  const [isGeodataLoading, SetGeodataLoading] = useState(true)
  const [geodataError, SetGeodataError] = useState(null)

  const { userGeodata, SetUserGeodata } = useUserContext()

  useEffect(() => {

    const fetching = async () => {
      try {

        const data = await bridge.send('VKWebAppGetGeodata')

        // Геоданные получены

        if (!!data)
          SetUserGeodata(data)
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useGeodata: ", e)
        SetGeodataError(NormalizeError('Ошибка получения геоданных пользователя'))
      }
      finally {
        SetGeodataLoading(false)
      }
    }
    fetching()
  }, [])

  return { isLoading: isGeodataLoading, geodataError, userGeodata }
}

export default useGeodata