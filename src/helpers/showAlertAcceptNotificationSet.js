import bridge from '@vkontakte/vk-bridge'

export const showAlertAcceptNotificationSet = async (userChoice) => bridge.send('VKWebAppStorageSet', 
    {
      key: 'isShowAlertAcceptNotifications',
      value: `${userChoice}`
    }).catch(() => {
      console.log(`Ошибка записи ключа isShowAlertAcceptNotifications, значение ${userChoice}`);
  });
