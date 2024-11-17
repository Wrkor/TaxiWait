import { Button, Spacing, Title } from '@vkontakte/vkui'
import { useMonitoringContext, useTaxiContext } from '../../hooks'
import useSocket from '../../hooks/useSocket'
import AlertConfirmActions from '../AlertConfirmActions/AlertConfirmActions'

export const MonitoringWaitContainer = () => {
	const { discountPrice, waitPrice } = useTaxiContext()
	const { isContinue } = useMonitoringContext()

	const { socket } = useSocket()

	const OnClickMonitoringContinue = (value) => {
		if (!socket) 
			return
		
		socket.emit('manageMonitoring', { "continue": value })
	}

  return (
		<div className='container'>
			{
        isContinue &&
        <AlertConfirmActions
					onAgree={() => OnClickMonitoringContinue(true)}
					onDisagree={() => OnClickMonitoringContinue(false)}
					textButtonAgree="Ок"
					textButtonDisagree="Отмена"
					header="Подтверждение"
					text="Пожалуйста подтвердите получение сообщений о заказах из сообщества 'Мониторинг такси'" />
      }
			
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
				{!!waitPrice ? `${waitPrice} руб.` : "Загрузка..."}
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
			<Button size="l" appearance="negative"
			style={{width: "80%"}} onClick={() => OnClickMonitoringContinue(false)}>
				Отменить мониторинг
			</Button>
		</div>
  )
}

export default MonitoringWaitContainer