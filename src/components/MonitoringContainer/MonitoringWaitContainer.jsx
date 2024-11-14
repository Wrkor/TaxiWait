import { Button, Spacing, Title } from '@vkontakte/vkui'
import { useMonitoringContext, useTaxiContext } from '../../hooks'

export const MonitoringWaitContainer = () => {
	const { price, discount, discountPrice } = useTaxiContext()
	const { SetMonitoringSuccess } = useMonitoringContext()

	const OnClickMonitoringCancel = () => {
		console.log("REQUEST_MONITORING_CANCEL")
		SetMonitoringSuccess(true)
	}

  return (
		<div className='container'>
			<Spacing size={40} />
			<Title level="1" className='nonSeleted colorFirst'> 
				Мониторинг стоимости:
			</Title>
			<Spacing size={60} />
			<Title level="1" className='nonSeleted colorFirst'> 
				Стоимость поездки
			</Title>
			<Spacing size={8} />
			<Title level="1" className='nonSeleted colorPrimary' style={{fontSize: "48px", lineHeight: "48px"}}> 
				{price} руб.
			</Title>
			<Spacing size={8} />
			<Title level="3" className='nonSeleted colorSecondary' style={{fontSize: "16px"}}> 
				Ожидаемая стоимость:
			</Title>
			<Spacing size={8} />
			<Title level="3" className='nonSeleted colorFirst' style={{fontSize: "16px"}}> 
				{discount}% ({discountPrice} руб.)
			</Title>
			<Spacing size={50} />
			<Button size="l" appearance="negative"
			style={{width: "80%"}} onClick={OnClickMonitoringCancel}>
				Отменить мониторинг
			</Button>
		</div>
  )
}

export default MonitoringWaitContainer