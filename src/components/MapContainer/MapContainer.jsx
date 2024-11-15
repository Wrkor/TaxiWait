import { useEffect, useRef } from 'react'
import { NetworkError } from '../'
import { useMap, useSnackbarContext } from '../../hooks'
import AppPanelSpinner from '../AppPanelSpinner/AppPanelSpinner'

export const MapContainer = ({onMove, ...props}) => {

  const mapRef = useRef(null)
  const { mapError, isMapLoading } = useMap(mapRef)
  const { SetSnackbarError } = useSnackbarContext()

//   useEffect(() =>
// 	if(mapError != null){
// 		prewarmUpdate()
// 	}
//   },[mapError])

	useEffect(() => {
		if (!!mapError)
			SetSnackbarError("Не удалось загрузить карту")
	}, [mapError])

	return (
		!mapError 
		?
			<div>
				{
					isMapLoading 
					? 
						<AppPanelSpinner />
					: 
						<></>
				}
			</div>
		:
			<>
				<NetworkError text="Не удалось загрузить карту" />
			</>
  )
}

export default MapContainer