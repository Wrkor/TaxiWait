import bridge from '@vkontakte/vk-bridge'

export const shareOrderModalGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: ['isShareOrder']})

    if(!result.keys) return false;

    const [pair] = (result).keys;
    const {value} = pair;
    
    return value == "true" ? true : false 
}


