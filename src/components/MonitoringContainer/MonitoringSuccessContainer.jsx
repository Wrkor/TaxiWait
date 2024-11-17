import { Button, Spacing, Title } from '@vkontakte/vkui'
import { AppPanelSpinner } from '../'
import { useMonitoringContext, useTaxiContext, useMapContext } from '../../hooks'

export const MonitoringSuccessContainer = () => {
	const { geocodeFrom, geocodeTo } = useMapContext()
	const { price, discountPrice } = useTaxiContext()
	const { SetMonitoringSuccess, SetMonitoringRun } = useMonitoringContext()

	const OnClickOrderTaxi = () => {
		console.log("REQUEST_MONITORING_GO_APP")
		SetMonitoringRun(false)
		SetMonitoringSuccess(false)
		const linkYGO = `https://3.redirect.appmetrica.yandex.com/route?start-lat=${geocodeFrom.lat}&start-lon=${geocodeFrom.long}&end-lat=${geocodeTo.lat}&end-lon=${geocodeTo.long}&tariffClass=econom&ref=yoursiteru&appmetrica_tracking_id=25395763362139037`
		window.open(linkYGO)
	}
	
  return (
		price && discountPrice ?
			<div className='container'>
				<Spacing size={40} />
				<Title level="1" className='nonSeleted colorFirst'> 
					Выполнено!
				</Title>
				<Spacing size={60} />
				<Title level="1" className='nonSeleted colorFirst'> 
					Стоимость поездки
				</Title>
				<Spacing size={8} />
				<Title level="1" className='nonSeleted colorSuccess' style={{fontSize: "48px", lineHeight: "48px"}}> 
					{price} руб.
				</Title>
				<Spacing size={8} />
				<Title level="3" className='nonSeleted colorSecondary' style={{fontSize: "16px"}}> 
					Ожидаемая стоимость:
				</Title>
				<Spacing size={8} />
				<Title level="3" className='nonSeleted colorFirst' style={{fontSize: "16px"}}> 
					{discountPrice} руб.
				</Title>
				<Spacing size={50} />
				<Button size="l" appearance="positive"
				style={{width: "80%"}} onClick={OnClickOrderTaxi}>
					Заказать такси!
				</Button>
			</div>
		:
			<AppPanelSpinner/>
  )
}

export default MonitoringSuccessContainer