import { useContext } from 'react'
import { DataContext } from '../context/data'

const defaultValues = {
  roadFrom: "",
  roadTo: "",
  isRoadSelect: false,
}

export const useMapData = () => {
  const dataContext = useContext(DataContext)
	
  const roadFrom = dataContext?.data?.map?.roadFrom
  const roadTo = dataContext?.data?.map?.roadTo
  const isRoadSelect = dataContext?.data?.map?.isRoadSelect

	const SetRoadFrom = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      map: {
        ...defaultValues,
				...dataContext?.data?.map,
        roadFrom: value,
      }
    })
	}

	const SetRoadTo = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      map: {
        ...defaultValues,
				...dataContext?.data?.map,
        roadTo: value,
      }
    })
	}

	const SetRoadSelect = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      map: {
        ...defaultValues,
				...dataContext?.data?.map,
        isRoadSelect: value,
      }
    })
	}

	return {roadFrom, SetRoadFrom, roadTo, SetRoadTo, isRoadSelect, SetRoadSelect}
}
export default useMapData