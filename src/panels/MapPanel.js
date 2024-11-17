import { Panel, PanelHeader } from '@vkontakte/vkui'
import { MapContainer, SnackbarError, SnackbarSuccess, SwipeableRoadPanel } from '../components'
import { SnackbarWarning } from '../components/Snackbar'
import { useSnackbarContext, useMonitoringContext } from '../hooks'
import AlertConfirmActions from '../components/AlertConfirmActions/AlertConfirmActions'
import useSocket from '../hooks/useSocket'

export const MapPanel = ({ id }) => {
  const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError, snackbarWarning, SetSnackbarWarning } = useSnackbarContext()
	const { isContinue } = useMonitoringContext()

	const { socket } = useSocket()

	const OnClickMonitoringContinue = (value) => {
		if (!socket) 
			return
		
		socket.emit('manageMonitoring', { "continue": value })
	}
  return (
    <Panel id={id}>
			{
        isContinue &&
        <AlertConfirmActions
					onAgree={() => {OnClickMonitoringContinue(true), window.open("https://vk.com/im?media=&sel=-226817243")}}
					onDisagree={() => OnClickMonitoringContinue(false)}
					textButtonAgree="Ок"
					textButtonDisagree="Отмена"
					header="Подтверждение"
					text="Пожалуйста подтвердите получение сообщений о заказах из сообщества 'Мониторинг такси'" />
      }
      <PanelHeader delimiter="none">Жду такси</PanelHeader>
      <MapContainer/>
      <SwipeableRoadPanel />
      {
        snackbarSuccess?.length > 0 && 
        <SnackbarSuccess onClose={() => SetSnackbarSuccess("")} text={snackbarSuccess}/>
      }
      {
        snackbarError?.length > 0  && 
        <SnackbarError onClose={() => SetSnackbarError("")} text={snackbarError}/>
      }
      {
        snackbarWarning?.length > 0  && 
        <SnackbarWarning onClose={() => SetSnackbarWarning("")} text={snackbarWarning}/>
      }
    </Panel>
  )
}


export default MapPanel