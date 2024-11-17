import { Icon24ChevronCompactRight, Icon28ArticleOutline, Icon28CarOutline, Icon28Notifications, Icon28VideoCircleOutline, Icon28ViewOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar, Banner, Cell, Div, Panel, PanelHeader, SimpleCell, Switch } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { AlertConfirmActions, AppPanelSpinner, SnackbarError, SnackbarSuccess, SnackbarWarning } from '../components'
import globalConstants from '../config/globalConstants'
import { useMonitoringContext, useSnackbarContext } from '../hooks'
import useSocket from '../hooks/useSocket'
import useUserContext from '../hooks/useUserContext'

export const AccountPanel = ({ id }) => {
    const routeNavigator = useRouteNavigator()
    const { userInfo, userData } = useUserContext()
    const { isMonitoringRun } = useMonitoringContext()
    const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError, snackbarWarning, SetSnackbarWarning } = useSnackbarContext()

    const [isLoading, SetIsLoading] = useState(true)
    const [isShowModal, SetShowModal] = useState(false)

    const { socket } = useSocket()

    const SetNotification = (value) => {
        if (!userData?.notifications?.vk?.verify) {
            SetShowModal(true)
            return
        }

        if (!socket)
            return
        
        socket.emit('updateNotification', { "active": value })
    }

    useEffect(() => {
        if (userData) {
            SetIsLoading(false)
        }
    }, [userData])

    return (
        <Panel id={id}>
            {
                isShowModal &&
                <AlertConfirmActions
                    onClose={() => SetShowModal(false)}
                    onAgree={() => SetNotification(true)}
                    textButtonAgree="Ок"
                    textButtonDisagree="Отмена"
                    header="Подтверждение"
                    text="Пожалуйста подтвердите получение сообщений о заказах из сообщества 'Мониторинг такси'" />
            }
            <PanelHeader>
                Профиль
            </PanelHeader>

            {
                isLoading
                    ?
                    <AppPanelSpinner />
                    :
                    <>
                        <Div>
                            {
                                isMonitoringRun &&
                                <Banner
                                    mode="image"
                                    header="Еще ведем мониторинг цены"
                                    asideMode="expand"
                                    onClick={() => routeNavigator.push(globalConstants.routes.main)}
                                    background={<div style={{ backgroundColor: '#2688eb' }}></div>}
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
                            after={<Switch checked={userData?.notifications?.vk?.active} onClick={() => { SetNotification(userData?.notifications?.vk?.active) }} onChange={() => {}} />}
                        >
                            Уведомления в ВК
                        </Cell>
                        <Cell
                            expandable="auto"
                            before={<Icon28ArticleOutline />}
                            subtitle="Стоимость, статусы, оценки"
                            after={<Icon24ChevronCompactRight />}
                            onClick={() => { routeNavigator.push("/account/orders") }}
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
                            onClick={() => routeNavigator.showModal(globalConstants.modal.confirmShareOrder)}
                        >
                            Отображение заказов
                        </Cell>
                    </>
            }
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

export default AccountPanel