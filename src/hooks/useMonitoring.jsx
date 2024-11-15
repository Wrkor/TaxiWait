import { useEffect, useState } from 'react'
import { NormalizeError } from '../helpers'
import useMonitoringContext from './useMonitoringContext'
import useUserContext from './useUserContext'

/**
 * Хук, который проверяет состояние мониторинга
 */
export const useMonitoring = () => {
  const [isMonitoringLoading, SetMonitoringLoading] = useState(true)
  const [monitoringError, SetMonitoringError] = useState(null)
  const [monitoring, SetMonitoring] = useState({})

  const { SetMonitoringActive } = useMonitoringContext()
  const { userInfo } = useUserContext()

  useEffect(() => {
    SetMonitoringActive(monitoring)
  }, [monitoring])

  useEffect(() => {
    if (!userInfo || !userInfo?.id) {
      SetMonitoringLoading(false)
      return
    }

    const fetching = async () => {
      try {
        const data = {} //await GetUserActiveMonitoring(userInfo?.id)

        // Мониторинг получен

        if (!!data) {
          SetMonitoring(data)
        }
      } 
      catch (e) {

        // Получена ошибка

        console.error("[ERROR] useMonitoring: ", e)
        SetMonitoringError(NormalizeError('Ошибка получения активного заказа'))
      }
      finally {
        SetMonitoringLoading(false)
      }
    }
    fetching()
  }, [userInfo])

  return { isMonitoringLoading, monitoringError, monitoring }
}

export default useMonitoring