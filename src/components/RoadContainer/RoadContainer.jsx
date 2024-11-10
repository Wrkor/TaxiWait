import { Icon16Search } from '@vkontakte/icons'
import { Separator, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { AsyncSelect, MonitoringRunContainer } from '../'
import { getAddress } from '../../api'
import { useMapData } from '../../hooks'

export const MapPanel = ({ OnOpenSelect, OnCloseSelect }) => {
	const { roadFrom, SetRoadFrom, roadTo, SetRoadTo, isRoadSelect, SetRoadSelect } = useMapData()

  useEffect(() => {
		const result = !!roadTo && !!roadFrom

		if (result) {
			console.log("REQUEST_PRICE_ROAD")
			SetRoadSelect(true)
		}
  }, [roadTo, roadFrom])

  return (
		<div className='container'>
			<AsyncSelect 
				defaultValue={roadFrom}
				className='nonSeleted'
				style={{ width: "85%"}}
				placeholder={"Откуда"} 
				request={getAddress} 
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
				request={getAddress} 
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