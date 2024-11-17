import { Map, YMaps } from '@pbe/react-yandex-maps'
import { useEffect, useRef, useState } from 'react'
import { NetworkError } from '../'
import globalConstants from '../../config/globalConstants'
import { NormalizeError } from '../../helpers'
import { useMapContext, useSnackbarContext, useUserContext } from '../../hooks'
import AppPanelSpinner from '../AppPanelSpinner/AppPanelSpinner'

export const MapContainer = ({onMove, ...props}) => {
  const { SetSnackbarError } = useSnackbarContext()
  const { geocodeFrom, geocodeTo } = useMapContext()
  const { userGeodata } = useUserContext()

	const [mapState, SetMapState] = useState({
		center: [globalConstants.map.coords.lat, globalConstants.map.coords.long],
		zoom: globalConstants.map.zoom,
	})
	const [isMapLoading, SetMapLoading] = useState(false)
	const [mapError, SetMapError] = useState(null)
	const [ymap, SetYMap] = useState(null)
  const mapRef = useRef(null)

	useEffect(() => {
		if (!!mapError)
			SetSnackbarError("Не удалось загрузить карту")
	}, [mapError])

	useEffect(() => {
		if (!userGeodata.available || !userGeodata?.lat || !userGeodata?.long)
			return
		
		SetMapState(prev => ({
			...prev,
			center: [userGeodata?.lat, userGeodata?.long],
		}))
	}, [userGeodata])

	useEffect(() => {
		if (!ymap?.multiRouter)
			return

		mapRef.current.geoObjects.removeAll()

		if (!geocodeFrom?.long || !geocodeFrom?.lat ||! geocodeTo?.long || !geocodeTo?.lat)
			return

		const multiRoute = new ymap.multiRouter.MultiRoute({
			referencePoints: [[geocodeFrom?.lat, geocodeFrom?.long], [geocodeTo?.lat, geocodeTo?.long]],
      params: {
				routingMode: "auto",
        avoidTrafficJams: false,
      }
    },{
			boundsAutoApply: true
    })
		
    mapRef.current.geoObjects.add(multiRoute)
	}, [geocodeFrom, geocodeTo, ymap])

	return (
		!mapError 
		?
			<div style={{position: "relative", maxHeight: "75vh", maxWidth:"100vw"}}>
				{
					isMapLoading &&
						<AppPanelSpinner /> 
				}
				<YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP }}>
					<Map
						width={'100vw'} height={'75vh'}
						modules={["multiRouter.MultiRoute"]}
						instanceRef={mapRef}
						onLoad={(ymaps) => {
							SetYMap(ymaps)
							SetMapLoading(true)
						}}
						onError={(e) => SetMapError(NormalizeError(e))}
						state={mapState}
						//onError={() => setLoadingMap('error')}
					/>
				</YMaps>
			</div>
		:
			<NetworkError text="Не удалось загрузить карту" />
  )
}

export default MapContainer