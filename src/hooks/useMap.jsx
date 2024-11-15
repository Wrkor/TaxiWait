import mmrgl from 'mmr-gl'
import 'mmr-gl/dist/mmr-gl.css'
import { useEffect, useState } from 'react'
import globalConstants from '../config/globalConstants'
import { useTheme } from './'

/**
 * Хук, который инциализирует ВК карту (хук не применяется, так как VK map не работает)
 */
export const useMap = (mapRef) => {
  const [isMapLoading, SetMapLoading] = useState(true)
  const [mapError, SetMapError] = useState(null)
  const [storedMapEntity, setStoredMapEntity] = useState()
  const { isDarkTheme } = useTheme()

  // const prewarmUpdate = () => {
  //   mmrgl.prewarm()
  //   mmrgl.config.REGISTERED_PROTOCOLS.
  // }

  const mapStyle = isDarkTheme ? globalConstants.map.theme.dark : globalConstants.map.theme.light

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    mmrgl.prewarm()
    mmrgl.baseApiUrl = "https://demo.maps.vk.com"
    mmrgl.accessToken = globalConstants.map.token

    const connectedMapEntity = new mmrgl.Map({
      container: mapRef.current,
      zoom: globalConstants.map.zoom,
      center: [globalConstants.map.coords.long, globalConstants.map.coords.lat],
      style: mapStyle,
      hash: false,
      transformRequest: (url, resourceType) => {
        return {
          url: url + "?limit=50",
        }
      }
    })

    connectedMapEntity.setStyle(mapStyle)
    setStoredMapEntity(connectedMapEntity)

    connectedMapEntity.on('load', () => SetMapLoading(false))
    connectedMapEntity.on('error', (error) => SetMapError(error))
    return () => connectedMapEntity.remove()
  }, [mapRef, isDarkTheme])

  return { mapError, isMapLoading, storedMapEntity }
};

export default useMap