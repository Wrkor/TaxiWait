import bridge from '@vkontakte/vk-bridge'

export const shareOrderModalSet = async (userChoice) => bridge.send('VKWebAppStorageSet', 
    {
      key: 'isShareOrder',
      value: `${userChoice}`
    }).catch(() => {
      console.log(`Ошибка записи ключа isShareOrder, значение ${userChoice}`);
  });
