import bridge from '@vkontakte/vk-bridge'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Icon28Notifications, Icon28ArticleOutline, Icon28VideoCircleOutline, Icon28ViewOutline, Icon24ChevronCompactRight, Icon28CarOutline } from '@vkontakte/icons'
import { Panel, PanelHeader, Avatar, SimpleCell, Image, Banner, Div, Cell, Switch } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'

export const AccountPanel = ({ id, fetchedUser }) => {
    const routeNavigator = useRouteNavigator()
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
                //onClick={() => void routeNavigator.showModal(EModal.CONFIRM_SHARE_ORDER)}
            >
                Отображение заказов
            </Cell>
        </Panel>
    )
}

export default AccountPanel