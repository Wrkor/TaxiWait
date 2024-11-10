import { Icon24ChevronCompactRight, Icon28ArticleOutline, Icon28CarOutline, Icon28Notifications, Icon28VideoCircleOutline, Icon28ViewOutline } from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar, Banner, Cell, Div, Panel, PanelHeader, SimpleCell, Switch } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import globalConstants from '../config/globalConstants'

export const AccountPanel = ({ id, fetchedUser }) => {
    const routerNavigator = useRouteNavigator()
    const [simple, setSimple] = useState('one')
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        async function getUserInfo() {
            const userInfo = await bridge.send('VKWebAppGetUserInfo')
            setUserInfo(userInfo)
        }
        getUserInfo()
    })

    return (
        <Panel id={id}>
            <PanelHeader>
                Профиль
            </PanelHeader>
            <Div>
                <Banner
                    mode="image"
                    header="Еще ведем мониторинг цены"
                    subheader="Прошло 3 минуты"
                    asideMode="expand"
                    background={<div style={{backgroundColor: '#2688eb'}}></div>}
                    before={<Icon28CarOutline />}
                />
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
                onClick={()=>{routerNavigator.push("/account/orders")}}
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
                onClick={()=>routerNavigator.showModal(globalConstants.modal.confirmShareOrder)}
            >
                Отображение заказов
            </Cell>
        </Panel>
    )
}

export default AccountPanel