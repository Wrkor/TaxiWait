import { useContext } from 'react'
import { MapContext } from '../context/MapProvider'

/**
 * Хук, который содержит информацию о карте
 */
export const useMapContext = () => {
  const mapContext = useContext(MapContext)
	
  const roadFrom = mapContext?.map?.roadFrom
  const geocodeFrom = mapContext?.map?.geocodeFrom
  const roadTo = mapContext?.map?.roadTo
  const geocodeTo = mapContext?.map?.geocodeTo
  const isRoadSelect = mapContext?.map?.isRoadSelect

	const SetRoadFrom = (value) => {
		mapContext.SetMap(prev => ({
      ...prev,
      roadFrom: value,
    }))
  }

  const SetGeocodeFrom = (value) => {
		mapContext.SetMap(prev => ({
      ...prev,
      geocodeFrom: value,
    }))
  }

	const SetRoadTo = (value) => {
		mapContext.SetMap(prev => ({
      ...prev,
      roadTo: value,
    }))
  }

  const SetGeocodeTo = (value) => {
		mapContext.SetMap(prev => ({
      ...prev,
      geocodeTo: value,
    }))
  }

	const SetRoadSelect = (value) => {
		mapContext.SetMap(prev => ({
      ...prev,
      isRoadSelect: value,
    }))
  }

	return {mapContext, roadFrom, SetRoadFrom, roadTo, SetRoadTo, isRoadSelect, SetRoadSelect, geocodeFrom, SetGeocodeFrom, geocodeTo, SetGeocodeTo}
}
export default useMapContext