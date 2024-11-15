import bridge from '@vkontakte/vk-bridge'

export const isShowNotificationSet = async (Choice) => {
  console.log('Записываем'+Choice)
  bridge.send('VKWebAppStorageSet', {
    key: 'isShowNotification',
    value: Choice
  })
}
