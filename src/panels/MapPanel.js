import { Panel, PanelHeader } from '@vkontakte/vkui'
import { MapContainer, SwipeableRoadPanel } from '../components'

export const RoadMapPanel = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader delimiter="none">Жду такси</PanelHeader>
      <MapContainer />
      <SwipeableRoadPanel />
    </Panel>
  )
}

export default RoadMapPanel