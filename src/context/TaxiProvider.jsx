import { createContext, useState } from 'react'
import initialValues from './initialValues'

export const TaxiContext = createContext()

export const TaxiProvider = ({ children }) => {
  const [taxi, SetTaxi] = useState(initialValues.taxi)

  return (
    <TaxiContext.Provider value={{ taxi, SetTaxi }}>
      {children}
    </TaxiContext.Provider>
  )
}

export default TaxiProvider