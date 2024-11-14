import { createContext, useState } from 'react'
import initialValues from './initialValues'

export const MapContext = createContext()

export const MapProvider = ({ children }) => {
  const [map, SetMap] = useState(initialValues.map)

  return (
    <MapContext.Provider value={{ map, SetMap }}>
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider