import bridge from '@vkontakte/vk-bridge'

export const onbordingShowSet = async () => bridge.send('VKWebAppStorageSet', 
    {
      key: 'isWasShowOnboarding',
      value: 'false' //заменить на true и заработает запоминание онбординга
    }).catch(() => {
      console.log(`Ошибка записи ключа isWasShowOnboarding, значение true`);
  });
