import { useContext } from 'react'
import { MonitoringContext } from '../context/MonitoringProvider'

/**
 * Хук, который содержит информацию об активном мониторинге
 */
export const useMonitoringContext = () => {
  const monitoringContext = useContext(MonitoringContext)

  const isMonitoringRun = monitoringContext?.monitoring?.isMonitoringRun
  const isMonitoringSuccess = monitoringContext?.monitoring?.isMonitoringSuccess
  const isContinue = monitoringContext?.monitoring?.isContinue

	const SetMonitoringRun = (value) => {
		monitoringContext.SetMonitoring(prev => ({
      ...prev,
      isMonitoringRun: value,
    }))
  }

	const SetMonitoringSuccess = (value) => {
		monitoringContext.SetMonitoring(prev => ({
      ...prev,
      price: value,
      isMonitoringSuccess: value,
    }))
  }

  const SetMonitoringContinue = (value) => {
		monitoringContext.SetMonitoring(prev => ({
      ...prev,
      isContinue: value,
    }))
  }

	return {monitoringContext, isMonitoringRun, SetMonitoringRun, isMonitoringSuccess, SetMonitoringSuccess, isContinue, SetMonitoringContinue}
}

export default useMonitoringContext