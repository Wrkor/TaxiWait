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
		monitoringContext.SetMonitoring({
      ...monitoringContext?.monitoring,
      ...value,
    })
	}

	const SetMonitoringRun = (value) => {
		monitoringContext.SetMonitoring({
      ...monitoringContext?.monitoring,
      isMonitoringRun: value,
    })
	}

	const SetMonitoringSuccess = (value) => {
		monitoringContext.SetMonitoring({
      ...monitoringContext?.monitoring,
      isMonitoringSuccess: value,
      isMonitoringRun: value,
    })
	}

	return {monitoringContext, isMonitoringRun, SetMonitoringRun, isMonitoringSuccess, SetMonitoringSuccess, SetMonitoringActive}
}

export default useMonitoringContext