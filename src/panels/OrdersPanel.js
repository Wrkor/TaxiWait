import { Icon28ArticleOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui'
import { SnackbarError, SnackbarSuccess } from '../components'
import { useSnackbarContext } from '../hooks'

export const OrdersPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator()
  const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError } = useSnackbarContext()

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
      {
        snackbarSuccess?.length > 0 && 
        <SnackbarSuccess onClose={() => SetSnackbarSuccess("")} text={snackbarSuccess}/>
      }
      {
        snackbarError?.length > 0  && 
        <SnackbarError onClose={() => SetSnackbarError("")} text={snackbarError}/>
      }
    </Panel>
  )
}

export default OrdersPanel