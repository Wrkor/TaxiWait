import { Button, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { SendStartMonitoring, StartConnection, StopConnection } from '../../api'
import { useMapContext, useMonitoringContext, useSnackbarContext, useTaxiContext, useUserContext } from '../../hooks'

export const MonitoringWaitContainer = () => {
	const { price, discount, discountPrice } = useTaxiContext()
	const { isRoadSelect, geocodeFrom, geocodeTo } = useMapContext()
	const { SetMonitoringRun, isMonitoringRun } = useMonitoringContext()
	const { SetSnackbarError } = useSnackbarContext()
	const { userLaunchParams } = useUserContext()

	const OnClickMonitoringCancel = () => {
		StopConnection()
		SetMonitoringRun(false)
		SetSnackbarError("Ожидание отменено")
	}

	const SetStartMonitoring = (data) => console.log("SetStartMonitoring", data)
	const SetManageMonitoring = (data) => console.log("SetManageMonitoring", data)
	const SetNotification = (data) => console.log("SetNotification", data)
	const SetError = (data) => console.log("SetError", data)
	const SetUnknown = (data) => console.log("SetUnknown", data)

	useEffect(() => {
		if (!isRoadSelect || geocodeFrom?.length < 3 || geocodeTo?.length < 3 || !discountPrice || !isMonitoringRun) {
			return
		}

		console.log("StartConnection")
		StartConnection(userLaunchParams, SetStartMonitoring, SetManageMonitoring, SetNotification, SetError, SetUnknown)

		const message = {
			"query": `${geocodeFrom}~${geocodeTo}`,
			"targetPrice": discountPrice,
		}
		console.log("SendStartMonitoring")
		SendStartMonitoring(message)
	}, [isMonitoringRun])

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