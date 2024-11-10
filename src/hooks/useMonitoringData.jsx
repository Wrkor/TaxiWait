import { useContext } from 'react'
import { DataContext } from '../context/data'

const defaultValues = {
  isMonitoringRun: false,
  isMonitoringSuccess: false,
}

export const useMonitoringData = () => {
  const dataContext = useContext(DataContext)

  const isMonitoringRun = dataContext?.data?.monitoring?.isMonitoringRun
  const isMonitoringSuccess = dataContext?.data?.monitoring?.isMonitoringSuccess

	const SetMonitoringRun = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      monitoring: {
        ...defaultValues,
				...dataContext?.data?.monitoring,
        isMonitoringRun: value,
      }
    })
	}

	const SetMonitoringSuccess = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      monitoring: {
        ...defaultValues,
				...dataContext?.data?.monitoring,
        isMonitoringSuccess: value,
      }
    })
	}

	return {isMonitoringRun, SetMonitoringRun, isMonitoringSuccess, SetMonitoringSuccess}
}

export default useMonitoringData