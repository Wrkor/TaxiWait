import bridge from '@vkontakte/vk-bridge'

/**
 * Хук, который отсеживает события и вызывает callback 
 */
export const useBridgeSubscribe = ( OnAppUpdateConfig ) => {
  bridge.subscribe((event) => {
    if (!event.detail) {
      return
    }

    if (event.detail.type === 'VKWebAppUpdateConfig') {
      OnAppUpdateConfig(event.detail.data)
    }
  })
}

export default useBridgeSubscribe