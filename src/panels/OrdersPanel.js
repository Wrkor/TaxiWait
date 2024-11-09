import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel, PanelHeader } from '@vkontakte/vkui'
import { useState } from 'react'

export const OrdersPanel = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator()
  const [simple, setSimple] = useState('one')

  return (
    <Panel id={id}>
      <PanelHeader>Все заказы</PanelHeader>
    </Panel>
  )
}

export default OrdersPanel