import { Panel, PanelHeader } from '@vkontakte/vkui'
import { MapContainer, SnackbarError, SnackbarSuccess, SwipeableRoadPanel } from '../components'
import AlertConfirmActions from '../components/AlertConfirmActions/AlertConfirmActions'
import { SnackbarWarning } from '../components/Snackbar'
import { useMonitoringContext, useSnackbarContext } from '../hooks'
import useSocket from '../hooks/useSocket'

export const MapPanel = ({ id }) => {
  const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError, snackbarWarning, SetSnackbarWarning } = useSnackbarContext()
  const { isContinue, SetMonitoringContinue } = useMonitoringContext()

  const { socket } = useSocket()

  const OnClickMonitoringContinue = (value) => {
    if (!socket)
      return
    socket.emit('manageMonitoring', { "continue": value })
  }
  return (
    <Panel id={id}>
      <a className="link_incorrect" style={{ display: 'none' }}
        href="https://vk.com/im?media=&sel=-226817243"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
      {
        isContinue &&
        <AlertConfirmActions
          onAgree={() => { OnClickMonitoringContinue(true) }}
          onDisagree={() => { OnClickMonitoringContinue(false) }}
          onClose={() => { SetMonitoringContinue(false) }}
          textButtonAgree="Продолжить"
          textButtonDisagree="Отменить"
          header="Подтверждение"
          text="Скидка не достигнута за 0 минут. Хотите продолжить мониторинг?" />
      }
      <PanelHeader delimiter="none">Жду такси</PanelHeader>
      <MapContainer/>
      <SwipeableRoadPanel />
      {
        snackbarSuccess?.length > 0 &&
        <SnackbarSuccess onClose={() => SetSnackbarSuccess("")} text={snackbarSuccess} />
      }
      {
        snackbarError?.length > 0 &&
        <SnackbarError onClose={() => SetSnackbarError("")} text={snackbarError} />
      }
      {
        snackbarWarning?.length > 0 &&
        <SnackbarWarning onClose={() => SetSnackbarWarning("")} text={snackbarWarning} />
      }
    </Panel>
  )
}


export default MapPanel