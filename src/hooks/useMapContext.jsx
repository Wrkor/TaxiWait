import { useContext } from 'react'
import { MapContext } from '../context/MapProvider'

/**
 * Хук, который содержит информацию о карте
 */
export const useMapContext = () => {
  const mapContext = useContext(MapContext)
	
  const roadFrom = mapContext?.map?.roadFrom
  const roadTo = mapContext?.map?.roadTo
  const isRoadSelect = mapContext?.map?.isRoadSelect

	const SetRoadFrom = (value) => {
		mapContext.SetMap({
      ...mapContext?.map,
      roadFrom: value,
    })
	}

	const SetRoadTo = (value) => {
		mapContext.SetMap({
      ...mapContext?.map,
      roadTo: value,
    })
	}

	const SetRoadSelect = (value) => {
		mapContext.SetMap({
      ...mapContext?.map,
      isRoadSelect: value,
    })
	}

	return {mapContext, roadFrom, SetRoadFrom, roadTo, SetRoadTo, isRoadSelect, SetRoadSelect}
}
export default useMapContext