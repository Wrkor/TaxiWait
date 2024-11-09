import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel, PanelHeader } from '@vkontakte/vkui'
import { useState } from 'react'

export const MapPanel = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator()
  const [simple, setSimple] = useState('one')

  return (
    <Panel id={id}>
      <PanelHeader>Жду такси</PanelHeader>
      <div>
        Саша лох
      </div>
    </Panel>
  )
}

export default MapPanel