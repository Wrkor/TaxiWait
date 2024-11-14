import { Icon24ChevronCompactRight, Icon28ArticleOutline, Icon28CarOutline, Icon28Notifications, Icon28VideoCircleOutline, Icon28ViewOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar, Banner, Cell, Div, Panel, PanelHeader, SimpleCell, Switch } from '@vkontakte/vkui'
import globalConstants from '../config/globalConstants'
import { useMapContext, useMonitoringContext, useTaxiContext } from '../hooks'
import useUserContext from '../hooks/useUserContext'

export const AccountPanel = ({ id }) => {
    const routeNavigator = useRouteNavigator()
    const { userInfo, userContext, sign, vkToken } = useUserContext()
    const { monitoringContext, isMonitoringRun } = useMonitoringContext()
    const { mapContext } = useMapContext()
    const { taxiContext } = useTaxiContext()

    console.log("userContext", userContext?.user)
    console.log("monitoringContext", monitoringContext?.monitoring)
    console.log("mapContext", mapContext?.map)
    console.log("taxiContext", taxiContext?.taxi)
    console.log("sign", sign)
    console.log("vkToken", vkToken)

    return (
        <Panel id={id}>
            <PanelHeader>
                Профиль
            </PanelHeader>
            <Div> 
                {
                    isMonitoringRun &&
                    <Banner
                        mode="image"
                        header="Еще ведем мониторинг цены"
                        asideMode="expand"
                        onClick={() => routeNavigator.push(globalConstants.routes.main)}
                        background={<div style={{backgroundColor: '#2688eb'}}></div>}
                        before={<Icon28CarOutline />}
                    />
                }
            </Div>
            <SimpleCell subtitle="1 уровень 3 раза ждун такси" before={
                <Avatar size={52} src={userInfo && userInfo?.photo_200} gradientColor="blue" />}>
                {userInfo && userInfo?.first_name} {userInfo && userInfo?.last_name}
            </SimpleCell>
            <Cell
                expandable="auto"
                before={<Icon28Notifications />}
                after={<Switch />}
            >
                Уведомления в ВК
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28ArticleOutline />}
                subtitle="Стоимость, статусы, оценки"
                after={<Icon24ChevronCompactRight />}
                onClick={()=>{routeNavigator.push("/account/orders")}}
            >
                Все заказы
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28VideoCircleOutline />}
                subtitle="Включена"
                after={<Icon24ChevronCompactRight />}
            >
                Реклама
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28ViewOutline />}
                subtitle="Включено"
                after={<Icon24ChevronCompactRight />}
                onClick={()=>routeNavigator.showModal(globalConstants.modal.confirmShareOrder)}
            >
                Отображение заказов
            </Cell>
        </Panel>
    )
}

export default AccountPanel