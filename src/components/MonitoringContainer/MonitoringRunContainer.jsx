import { Button, Slider, Spacing, Title } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { AppPanelSpinner } from '..'
import { GetPrice } from '../../api'
import { useMapContext, useMonitoringContext, useSnackbarContext, useTaxiContext, useUserContext } from '../../hooks'

export const MonitoringRunContainer = () => {
	const { price, SetOrder, ClearOrder, discount, SetDiscount, discountPrice, SetDiscountPrice } = useTaxiContext()
	const { SetMonitoringRun } = useMonitoringContext()
	const { isRoadSelect, geocodeFrom, geocodeTo } = useMapContext()
	const { vkToken } = useUserContext()

	const { SetSnackbarSuccess } = useSnackbarContext()

	const OnClickMonitoringRun = () => {
		SetMonitoringRun(true)
		SetSnackbarSuccess("Запущено ожидание такси")
	}

	useEffect(() => {
    SetDiscountPrice(Math.round(price * (1 - discount / 100)))
  }, [price, discount])

	useEffect(() => {
		if (!isRoadSelect || geocodeFrom?.length < 3 || geocodeTo?.length < 3) {
			ClearOrder()
			return
		}

		const fecthing = async () => {
			
			try {
				const result = await GetPrice({"q": `${geocodeFrom}~${geocodeTo}`}, vkToken)
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