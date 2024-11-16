import bridge from '@vkontakte/vk-bridge'
import globalConstants from '../config/globalConstants'

const key = globalConstants.storage.isShowNotification

export const isShowNotificationGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: [key]})

    if(!result.keys) return false;

    const [pair] = (result).keys;
    const {value} = pair;
    
    return value == "true" ? true : false 
}

export const isShowNotificationSet = async (value) => {
  try {
      await bridge.send('VKWebAppStorageSet', {
          key: key,
          value: `${value}`
      })
  }
  catch (e) {
      console.error(`[ERROR] isShowNotificationSet: ${JSON.stringify(e)}\nОшибка записи в VK Storage. Ключ - ${key}, значение - ${value}`)
  }
}

