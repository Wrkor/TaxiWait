import { Icon24ChevronCompactRight, Icon28ArticleOutline, Icon28CarOutline, Icon28Notifications, Icon28VideoCircleOutline, Icon28ViewOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar, Banner, Cell, Div, Panel, PanelHeader, SimpleCell, Switch } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { SnackbarError, SnackbarSuccess } from '../components'
import AlertConfirmActions from '../components/AlertConfirmActions/AlertConfirmActions.jsx'
import AppPanelSpinner from '../components/AppPanelSpinner/AppPanelSpinner.jsx'
import globalConstants from '../config/globalConstants'
import { isShowNotificationGet, isShowNotificationSet, showAlertAcceptNotificationGet } from '../helpers'
import { useMapContext, useMonitoringContext, useSnackbarContext, useTaxiContext } from '../hooks'
import useUserContext from '../hooks/useUserContext'

export const AccountPanel = ({ id }) => {
    const routeNavigator = useRouteNavigator()
    const { userInfo, userContext, sign, vkToken } = useUserContext()
    const { monitoringContext, isMonitoringRun } = useMonitoringContext()
    const { mapContext } = useMapContext()
    const { taxiContext } = useTaxiContext()

    const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError } = useSnackbarContext()

    console.log("userContext", userContext?.user)
    console.log("monitoringContext", monitoringContext?.monitoring)
    console.log("mapContext", mapContext?.map)
    console.log("taxiContext", taxiContext?.taxi)
    console.log("sign", sign)
    console.log("vkToken", vkToken)

    const [isLoading, setIsLoading] = useState(true)
    const [initShowAlert, setInitShowAlert] = useState(false)
    const [isShowAlertAcceptNotification, setShowAlertNotification] = useState(false)
    const [isAgreeOnNotification, setAgreeOnNotification] = useState(false)

    useEffect(() => {
        const initSwitch = (async () => {
            let isAgree = await isShowNotificationGet()
            console.log("Получили"+isAgree)
            setAgreeOnNotification(isAgree)
            let initShowAlertGet = await showAlertAcceptNotificationGet()
            setInitShowAlert(initShowAlertGet) 
            setIsLoading(false)
        })
        initSwitch()
    }, [])

    const chageGetNotification = async () => {
        //const isShowAlert = showAlertAcceptNotificationGet()
        console.log("initShowAlert"+initShowAlert)
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
                            <Avatar size={52} src={userVK && userVK?.photo_200} gradientColor="blue" />}>
                            {userVK && userVK?.first_name} {userVK && userVK?.last_name}
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