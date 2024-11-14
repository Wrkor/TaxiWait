import { useEffect, useRef } from 'react'
import { NetworkError } from '../'
import { useMap, useSnackbar } from '../../hooks'
import AppPanelSpinner from '../AppPanelSpinner/AppPanelSpinner'
import styles from './MapContainer.module.scss'

export const MapContainer = ({onMove, ...props}) => {
  const mapRef = useRef(null)
  const { mapError, isMapLoading } = useMap(mapRef)
  const { SetSnackbarError } = useSnackbar()

	useEffect(() => {
		if (!!mapError)
			SetSnackbarError("Не удалось загрузить карту")
	}, [mapError])

	return (
		!mapError 
		?
			<div 
				onClick={onMove} 
				className={styles.map} 
				ref={mapRef}
				{...props}
			>
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