import { useRef } from 'react'
import { NetworkError, SnackbarError } from '../'
import { useMap } from '../../hooks'
import AppPanelSpinner from '../AppPanelSpinner/AppPanelSpinner'
import styles from './MapContainer.module.scss'

export const MapContainer = ({onMove, ...props}) => {
  const mapRef = useRef(null);
  const { mapError, isLoading, storedMapEntity } = useMap(mapRef);
  
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
					isLoading 
					? 
						<AppPanelSpinner />
					: 
						<></>
				}
			</div>
		:
			<>
				<SnackbarError text="Не удалось загрузить карту" />
				<NetworkError text="Не удалось загрузить карту" />
			</>
  )
}

export default MapContainer