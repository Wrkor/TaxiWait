import bridge from '@vkontakte/vk-bridge'

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