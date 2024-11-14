import { createContext, useState } from 'react'
import initialValues from './initialValues'

export const MonitoringContext = createContext()

export const MonitoringProvider = ({ children }) => {
  const [monitoring, SetMonitoring] = useState(initialValues.monitoring)

  return (
    <MonitoringContext.Provider value={{ monitoring, SetMonitoring }}>
      {children}
    </MonitoringContext.Provider>
  )
}

export default MonitoringProvider