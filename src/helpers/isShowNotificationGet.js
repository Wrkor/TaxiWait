import bridge from '@vkontakte/vk-bridge'

export const isShowNotificationGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: ['isShowNotification']})

    if(!result.keys) return false;

    const [pair] = (result).keys;
    const {value} = pair;
    
    return value == "true" ? true : false 
}


