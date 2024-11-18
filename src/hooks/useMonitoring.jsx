import { useEffect } from 'react'
import useMonitoringContext from './useMonitoringContext'

import useSocket from './useSocket'
import useTaxiContext from './useTaxiContext'

/**
 * Хук, который проверяет состояние мониторинга
 */
export const useMonitoring = () => {
  const { SetMonitoringRun, SetMonitoringSuccess, SetMonitoringContinue, SetElapsedTime } = useMonitoringContext()
  const { SetWaitPrice } = useTaxiContext()

  const {socket, isConnect} = useSocket()

  useEffect(() => {

    if (socket) {
      socket.on('message', ({ event, data }) => {

        if (event === "notification") {

          if (data?.type === "info") {
            if (data?.message.includes("остановлен")){
              SetMonitoringRun(false)
              SetMonitoringSuccess(false)
              SetMonitoringContinue(false)
            }
    
            else if (["запущен", "возобновлен"].some(substring => data.message.includes(substring))){
              SetMonitoringRun(true)
              SetMonitoringSuccess(false)
              SetMonitoringContinue(false)
            }
          }
  
          else if (data?.type === "warning") {
            if (data?.message.includes("продолжить")){
              SetMonitoringContinue(true)
            }
          }
        }

        else if (event === "startMonitoring") {
          SetMonitoringRun(true)
          SetElapsedTime(data?.elapsedTime)
          SetWaitPrice(data?.price)

          if (data?.result){
            SetMonitoringRun(false)
            SetMonitoringSuccess(true)
            SetMonitoringContinue(false)
          }
        }
      })
      return () => socket.off('message')
    }
  }, [socket, isConnect])
}

export default useMonitoring