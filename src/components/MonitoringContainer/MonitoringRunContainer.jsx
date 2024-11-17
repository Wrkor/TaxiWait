import { Button, Slider, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { AppPanelSpinner } from '..'
import { GetPrice } from '../../api'
import { useMapContext, useTaxiContext, useUserContext } from '../../hooks'
import useSocket from '../../hooks/useSocket'

export const MonitoringRunContainer = () => {
	const { price, SetOrder, ClearOrder, discount, SetDiscount, discountPrice, SetDiscountPrice, SetWaitPrice } = useTaxiContext()
	const { isRoadSelect, geocodeFrom, geocodeTo } = useMapContext()
	const { vkToken } = useUserContext()
	const {socket} = useSocket()

	const OnClickMonitoringRun = () => {
		if (!isRoadSelect || !geocodeFrom?.lat  || !geocodeFrom?.long|| !geocodeTo?.lat || !geocodeTo?.long || !discountPrice || !socket) 
			return

		const message = {
			query: `${geocodeFrom.long},${geocodeFrom.lat}~${geocodeTo.long},${geocodeTo.lat}`,
			targetPrice: discountPrice,
		}

		socket.emit('startMonitoring', message);
		SetWaitPrice(price)
	}

	useEffect(() => {
    SetDiscountPrice(Math.round(price * (1 - discount / 100)))
  }, [price, discount])

	useEffect(() => {
		if (!isRoadSelect || !geocodeFrom?.lat  || !geocodeFrom?.long|| !geocodeTo?.lat || !geocodeTo?.long) {
			ClearOrder()
			return
		}

		const fecthing = async () => {
			const q = `${geocodeFrom.long},${geocodeFrom.lat}~${geocodeTo.long},${geocodeTo.lat}`
			try {
				const result = await GetPrice({"q": q}, vkToken)
				SetOrder(result)
			}
			catch (e) {
				SetSnackbarError("Не удалось загрузить данные")
			}
		}
		fecthing()

  }, [isRoadSelect, geocodeFrom, geocodeTo])

  return (
		price ?
			<div className='container'>
				<Spacing size={8} />
				<Title level="1" className='nonSeleted colorFirst'> 
					Стоимость поездки
				</Title>
				<Spacing size={8} />
				<Title level="1" className='nonSeleted colorActive' style={{fontSize: "48px", lineHeight: "48px"}}> 
					{price} руб.
				</Title>
				<Spacing size={8} />
				<Title level="3" className='nonSeleted colorSecondary' style={{fontSize: "16px"}}> 
					Укажите скидку:
				</Title>
				<Spacing size={8} />
				<Title level="3" className='nonSeleted colorFirst' style={{fontSize: "16px"}}> 
					{discount}% ({discountPrice} руб.)
				</Title>
				<Spacing size={16} />
				<Slider value={discount} onChange={SetDiscount} style={{width: "85%"}}/>
				<Spacing size={16} />
				<Button size="l" className="btnWarning" appearance="accent" 
				style={{width: "80%"}} onClick={OnClickMonitoringRun}>
					Жду такси
				</Button>
			</div>
		:
			<AppPanelSpinner/>
  )
}

export default MonitoringRunContainer