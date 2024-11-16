import bridge from '@vkontakte/vk-bridge'
import globalConstants from '../config/globalConstants'

const key = globalConstants.storage.isShowAlertAcceptNotifications

export const ShowAlertAcceptNotificationGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: [key]})

    if(!result.keys) {
        await ShowAlertAcceptNotificationSet("false")
        return true
    }

    const [pair] = (result).keys;
    const {value} = pair;

    if(value == "true") 
        await ShowAlertAcceptNotificationSet("false")

    //для теста уведомлялки
    return value == "true" || value == "" ? true : false
}

export const ShowAlertAcceptNotificationSet = async (value) => {
    try {
        await bridge.send('VKWebAppStorageSet', {
            key: key,
            value: `${value}`
        })
    }
    catch (e) {
        console.error(`[ERROR] ShowAlertAcceptNotificationSet: ${JSON.stringify(e)}\nОшибка записи в VK Storage. Ключ - ${key}, значение - ${value}`)
    }
} 



