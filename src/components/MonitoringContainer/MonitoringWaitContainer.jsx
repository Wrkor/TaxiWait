import { Button, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { SendStartMonitoring, StartConnection, StopConnection } from '../../api'
import { useMapContext, useMonitoringContext, useSnackbarContext, useTaxiContext, useUserContext } from '../../hooks'

export const MonitoringWaitContainer = () => {
	const { price, discount, discountPrice, waitPrice, SetWaitPrice } = useTaxiContext()
	const { isRoadSelect, geocodeFrom, geocodeTo } = useMapContext()
	const { SetMonitoringRun, SetMonitoringSuccess, isMonitoringRun } = useMonitoringContext()
	const { SetSnackbarError, SetSnackbarSuccess, SetSnackbarWarning } = useSnackbarContext()
	const { userLaunchParams } = useUserContext()

	const OnClickMonitoringCancel = () => {
		StopConnection()
		SetMonitoringRun(false)
		SetSnackbarError("Ожидание отменено")
	}

	const SetStartMonitoring = (data) => {
		if (!data)
			return

		SetWaitPrice(data?.price)
		SetMonitoringSuccess(!!data?.result)
	}

	const SetManageMonitoring = (data) =>{
		// ВОПРОС ЗАДАЕТ ВЫПЛЮНУТЬ МОДАЛКУ
		console.log("SetManageMonitoring", data)
	} 

	const SetNotification = (data) => {
		if (!data?.type || !data?.message)
			return

		if (data?.type === "info")
			SetSnackbarSuccess(data?.message)

		else if (data?.type === "warning")
			SetSnackbarWarning(data?.message)

		else if (data?.type === "critical")
			SetSnackbarError(data?.message)
	}

	const SetError = (data) => {
		SetSnackbarError(data?.message)
		console.log("[ERROR]", data)
	}

	const SetUnknown = (data) => {
		console.log("[Unknown]", data)
	}

	const SetUserData = (data) => {

		console.log("SetUserData", data)
	}

	useEffect(() => {
		SetWaitPrice(data?.price)
	}, [price])

	useEffect(() => {
		if (!isRoadSelect || !geocodeFrom?.lat  || !geocodeFrom?.long|| !geocodeTo?.lat || !geocodeTo?.long || !discountPrice || !isMonitoringRun) {
			return
		}

		StartConnection(userLaunchParams, SetStartMonitoring, SetManageMonitoring, SetNotification, SetUserData, SetError, SetUnknown)

		const message = {
			query: `${geocodeFrom.long},${geocodeFrom.lat}~${geocodeTo.long},${geocodeTo.lat}`,
			targetPrice: discountPrice,
		}
		
		SendStartMonitoring(message)
	}, [isMonitoringRun, geocodeFrom, geocodeTo])

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
				{waitPrice} руб.
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