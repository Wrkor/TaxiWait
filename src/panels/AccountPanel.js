import { Icon24ChevronCompactRight, Icon28ArticleOutline, Icon28CarOutline, Icon28Notifications, Icon28VideoCircleOutline, Icon28ViewOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar, Banner, Cell, Div, Panel, PanelHeader, SimpleCell, Switch } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { SnackbarError, SnackbarSuccess } from '../components'
import AlertConfirmActions from '../components/AlertConfirmActions/AlertConfirmActions.jsx'
import AppPanelSpinner from '../components/AppPanelSpinner/AppPanelSpinner.jsx'
import globalConstants from '../config/globalConstants'
import { isShowNotificationGet, isShowNotificationSet, ShowAlertAcceptNotificationGet } from '../helpers'
import { useMonitoringContext, useSnackbarContext } from '../hooks'
import useUserContext from '../hooks/useUserContext'
import useBot from '../hooks/index.js'

export const AccountPanel = ({ id }) => {
    const routeNavigator = useRouteNavigator()
    const { userInfo } = useUserContext()
    const { isMonitoringRun } = useMonitoringContext()

    const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError } = useSnackbarContext()

    const [isLoading, setIsLoading] = useState(false)
    const [initShowAlert, setInitShowAlert] = useState(false)
    const [isShowAlertAcceptNotification] = useBot()
    const [isAgreeOnNotification, setAgreeOnNotification] = useState(false)
   
    useEffect(() => {
        setIsLoading(true)
        const initSwitch = (async () => {
            let isAgree = await isShowNotificationGet()
            setAgreeOnNotification(isAgree)
            let initShowAlertGet = await ShowAlertAcceptNotificationGet()
            setInitShowAlert(initShowAlertGet) 
            setIsLoading(false)
        })
        initSwitch()
    }, [])

    const chageGetNotification = async () => {
        //const isShowAlert = ShowAlertAcceptNotificationGet()
        if (!initShowAlert) {
            setAgreeOnNotification(!isAgreeOnNotification)
            await isShowNotificationSet(`${!isAgreeOnNotification}`)
        }
        else{
            setShowAlertNotification(true)
        }
    }

    return (
        <Panel id={id}>
            {

                isShowAlertAcceptNotification &&
                <AlertConfirmActions
                    onClose={() => { setShowAlertNotification(false);}}
                    onAgree={async () => { setAgreeOnNotification(true); await isShowNotificationSet(`true`) }}
                    onDisagree={async () => { setAgreeOnNotification(false); await isShowNotificationSet(`false`) }}
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
                            after={<Switch checked={isAgreeOnNotification} onClick={() => { chageGetNotification() }} />}
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
        </Panel>
    )
}

export default AccountPanel