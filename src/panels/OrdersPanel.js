import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Icon28ArticleOutline } from '@vkontakte/icons'

import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui'
import { useState } from 'react'

export const OrdersPanel = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator()
  const [simple, setSimple] = useState('one')

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>Все заказы</PanelHeader>
      <Placeholder
          icon={<Icon28ArticleOutline />}
          stretched
        >
          У вас пока нет заказов
        </Placeholder>
    </Panel>
  )
}

export default OrdersPanel