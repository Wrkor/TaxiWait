import bridge from '@vkontakte/vk-bridge'
import {showAlertAcceptNotificationSet} from './showAlertAcceptNotificationSet.js'
export const showAlertAcceptNotificationGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: ['isShowAlertAcceptNotifications']})

    if(!result.keys) {
        await showAlertAcceptNotificationSet("false")
        return true
    };


    const [pair] = (result).keys;
    const {value} = pair;
    if(value == "true"){ await showAlertAcceptNotificationSet("false")}
    else{
        await showAlertAcceptNotificationSet("true")
    }//для теста уведомлялки
    return value == "true" || value == "" ? true : false
}


