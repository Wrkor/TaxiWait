import bridge from '@vkontakte/vk-bridge'
import globalConstants from '../config/globalConstants'

const key = globalConstants.storage.isWasShowOnboarding

export const OnbordingShowGet = async () => {
    const result = await bridge.send('VKWebAppStorageGet', {keys: [key]})

    if(!result?.keys) 
        return false

    const [pair] = (result).keys
    const {value} = pair
    
    return value === "true"
}

export const OnbordingShowSet = async (value) =>  {

    // Value заменить на true и заработает запоминание онбординга
    
    try {
        await bridge.send('VKWebAppStorageSet', {
            key,
            value, 
        })
    }
    catch (e) {
        console.error(`[ERROR] ShareOrderModalSet: ${JSON.stringify(e)}\nОшибка записи в VK Storage. Ключ - ${key}, значение - ${value}`)
    }
}

