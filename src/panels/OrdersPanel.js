import { Icon28ArticleOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui'

export const OrdersPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator()

  return (
    <Panel id={id}>
      <PanelHeader 
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Все заказы
      </PanelHeader>

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