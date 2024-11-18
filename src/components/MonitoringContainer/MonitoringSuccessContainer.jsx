import { Button, Spacing, Title } from '@vkontakte/vkui'
import { AppPanelSpinner } from '../'
import { useMapContext, useMonitoringContext, useTaxiContext } from '../../hooks'

export const MonitoringSuccessContainer = () => {
	const { geocodeFrom, geocodeTo } = useMapContext()
	const { price, discountPrice } = useTaxiContext()
	const { SetMonitoringSuccess, SetMonitoringRun } = useMonitoringContext()

	const OnClickOrderTaxi = () => {
		SetMonitoringRun(false)
		SetMonitoringSuccess(false)
		handleLabelClick()
	}
	
	function handleLabelClick() {
		const link = document.querySelector('.link_incorrect3');

		// Проверить, что ссылка существует
		if (link) {
			// Симулировать клик по ссылке
			link.click();
		}
	}

	function handleLabelClick2() {
			const link = document.querySelector('.link_incorrect4');

			// Проверить, что ссылка существует
			if (link) {
				// Симулировать клик по ссылке
				link.click();
			}
	}

  return (
		price && discountPrice ?
			<div className='container'>
				<button onClick={() => handleLabelClick2()} style={{ display: 'none' }} className="link_incorrect3">Click</button>
				<a className="link_incorrect4" style={{ display: 'none' }}
				href={`https://3.redirect.appmetrica.yandex.com/route?start-lat=${geocodeFrom.lat}&start-lon=${geocodeFrom.long}&end-lat=${geocodeTo.lat}&end-lon=${geocodeTo.long}&tariffClass=econom&ref=yoursiteru&appmetrica_tracking_id=25395763362139037`}
				target="_blank"
				rel="noopener noreferrer"
				/>
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