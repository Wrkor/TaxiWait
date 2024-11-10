import { Button, Slider, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { AppPanelSpinner } from '..'
import { useMapData, useMonitoringData, usePriceData } from '../../hooks'

export const MonitoringRunContainer = () => {
	const { price, SetPrice, discount, SetDiscount, discountPrice, SetDiscountPrice } = usePriceData()
	const { SetMonitoringRun } = useMonitoringData()
	const { roadFrom, roadTo, isRoadSelect } = useMapData()

	const OnClickMonitoringRun = () => {
		console.log("REQUEST_MONITORING_RUN")
		SetMonitoringRun(true)
	}

	const onChangeDiscount = (value) => {
    const newPrice = Math.round(price * (1 - value / 100))
    SetDiscountPrice(newPrice)
  }

	useEffect(() => {
		onChangeDiscount(discount)
  }, [price])

	useEffect(() => {
		onChangeDiscount(discount)
  }, [discount])

	useEffect(() => {
		if (isRoadSelect) {
			console.log("REQUEST_PRICE_ROAD")
			SetPrice(350)
		}
  }, [isRoadSelect])

  return (
		!!price ?
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