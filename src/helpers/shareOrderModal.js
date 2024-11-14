import bridge from '@vkontakte/vk-bridge'
import globalConstants from '../config/globalConstants'

const key = globalConstants.storage.isShareOrder

export const ShareOrderModalGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: [key]})

    if(!result?.keys) 
        return false

    const [pair] = (result).keys
    const {value} = pair
    
    return value === "true"
}

export const ShareOrderModalSet = async (value) =>  {

    try {
        await bridge.send('VKWebAppStorageSet', {
            key,
            value 
        })
    }
    catch (e) {
        console.error(`[ERROR] ShareOrderModalSet: ${JSON.stringify(e)}\nОшибка записи в VK Storage. Ключ - ${key}, значение - ${value}`)
    }
}