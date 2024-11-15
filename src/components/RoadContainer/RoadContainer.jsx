import { Icon16Search } from '@vkontakte/icons'
import { Separator, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { AsyncSelect, MonitoringRunContainer } from '../'
import { GetGeocodeAddress, GetSuggestAddress } from '../../api/'
import globalConstants from '../../config/globalConstants'
import { useMapContext, useSnackbarContext, useUserContext } from '../../hooks'

const params = { limit: 5 }

export const MapPanel = ({ OnOpenSelect, OnCloseSelect }) => {
	const { roadFrom, SetRoadFrom, roadTo, SetRoadTo, isRoadSelect, SetRoadSelect, SetGeocodeFrom, SetGeocodeTo } = useMapContext()
	const { vkToken, userGeodata } = useUserContext()

	const { SetSnackbarError } = useSnackbarContext()

	const lat = userGeodata.available && !!userGeodata?.lat ? userGeodata?.lat : globalConstants.map.coords.lat
	const long = userGeodata.available && !!userGeodata?.long ? userGeodata?.long : globalConstants.map.coords.long

	useEffect(() => {
		if (roadTo?.length < 10)  {
			SetGeocodeTo("")
			return
		}

		const fecthing = async () => {

			try {
				const result = await GetGeocodeAddress({"q": roadTo}, vkToken, params)
				SetGeocodeTo(result)
			}
			catch (e) {
				SetSnackbarError("Не удалось загрузить данные")
			}
		}
		fecthing()
  }, [roadTo])

	useEffect(() => {
		if (roadFrom?.length < 10) {
			SetGeocodeFrom("")
			return
		}

		const fecthing = async () => {

			try {
				const result = await GetGeocodeAddress({"q": roadFrom}, vkToken, params)
				SetGeocodeFrom(result)
			}
			catch (e) {
				SetSnackbarError("Не удалось загрузить данные")
			}
		}
		fecthing()
  }, [roadFrom])

  useEffect(() => {
		SetRoadSelect(!!roadTo && !!roadFrom)
  }, [roadTo, roadFrom])

  return (
		<div className='container'>
			<AsyncSelect 
				defaultValue={roadFrom}
				className='nonSeleted'
				style={{ width: "85%"}}
				placeholder={"Откуда"} 
				length={3}
				request={async (value) => await GetSuggestAddress({ q: value, location: `${lat},${long}`}, vkToken, params)} 
				onInputChange={() => OnOpenSelect()} 
				onOpen={() => OnOpenSelect()} 
				onClose={() => OnCloseSelect()} 
				onSelect={(value) => SetRoadFrom(value)} 
				icon={<Icon16Search fill='#99A2AD'/>}
			/>
			<Spacing size={8} />
			<Separator mode='primary' style={{width: "85%"}}/>
			<Spacing size={8} />
			<AsyncSelect 
				defaultValue={roadTo}
				className='nonSeleted'
				style={{ width: "85%"}}
				placeholder={"Куда"} 
				length={3}
				request={async (value) => await GetSuggestAddress({ q: value, location: `${lat},${long}`}, vkToken, params)} 
				onInputChange={() => OnOpenSelect()} 
				onOpen={() => OnOpenSelect()} 
				onClose={() => OnCloseSelect()} 
				onSelect={(value) => SetRoadTo(value)} 
				icon={<Icon16Search fill='#99A2AD'/>}
			/>
			<Spacing size={8} />
			<Separator mode='primary' style={{width: "85%"}}/>
			{
				!isRoadSelect
				?
					<>
						<Spacing size={40} />
						<Title level="3" className='nonSeleted colorSecondary'> 
							Укажите адрес поездки
						</Title>
					</>
				:
					<>
						<Spacing size={8} />
						<MonitoringRunContainer />
					</>
			}
		</div>
  )
}

export default MapPanel