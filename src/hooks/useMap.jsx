import mmrgl from 'mmr-gl'
import 'mmr-gl/dist/mmr-gl.css'
import { useEffect, useState } from 'react'
import globalConstants from '../config/globalConstants'
import { useTheme } from './'

export const useMap = (mapRef) => {
  const [isLoading, setLoading] = useState(true)
  const [mapError, setMapError] = useState()
  const [storedMapEntity, setStoredMapEntity] = useState()
  const { isDarkTheme } = useTheme()

  const mapStyle = isDarkTheme ? globalConstants.map.theme.dark : globalConstants.map.theme.light

  useEffect(() => {
    if (!mapRef.current || !appearance) {
      return;
    }

    mmrgl.prewarm()
    mmrgl.accessToken = globalConstants.map.token
    const connectedMapEntity = new mmrgl.Map({
      container: mapRef.current,
      zoom: globalConstants.map.zoom,
      center: [globalConstants.map.coords.lng, globalConstants.map.coords.lat],
      style: mapStyle,
      hash: false,
    })

    connectedMapEntity.setStyle(mapStyle)
    setStoredMapEntity(connectedMapEntity)

    connectedMapEntity.on('load', () => setLoading(false));
    connectedMapEntity.on('error', (error) => setMapError(error));
    return () => connectedMapEntity.remove()
    
  }, [mapRef, isDarkTheme]);

  return { mapError, isLoading, storedMapEntity };
};

export default useMap