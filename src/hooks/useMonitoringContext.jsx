import { useContext } from 'react'
import { MonitoringContext } from '../context/MonitoringProvider'

/**
 * Хук, который содержит информацию об активном мониторинге
 */
export const useMonitoringContext = () => {
  const monitoringContext = useContext(MonitoringContext)

  const isMonitoringRun = monitoringContext?.monitoring?.isMonitoringRun
  const isMonitoringSuccess = monitoringContext?.monitoring?.isMonitoringSuccess

  const SetMonitoringActive = (value) => {
		monitoringContext.SetMonitoring(prev => ({
      ...prev,
      ...value,
    }))
  }

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

	return {monitoringContext, isMonitoringRun, SetMonitoringRun, isMonitoringSuccess, SetMonitoringSuccess, SetMonitoringActive}
}

export default useMonitoringContext