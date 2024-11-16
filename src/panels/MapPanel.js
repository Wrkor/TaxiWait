import { Panel, PanelHeader } from '@vkontakte/vkui'
import { MapContainer, SnackbarError, SnackbarSuccess, SwipeableRoadPanel } from '../components'
import { SnackbarWarning } from '../components/Snackbar'
import { useSnackbarContext } from '../hooks'

export const MapPanel = ({ id }) => {
  const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError, snackbarWarning, SetSnackbarWarning } = useSnackbarContext()

  return (
    <Panel id={id}>
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