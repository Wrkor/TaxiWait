import bridge from '@vkontakte/vk-bridge'

export const enableSwipe = async () => {
  
  if (!await bridge.supportsAsync('VKWebAppSetSwipeSettings')) {
    return;
  }

  try {
    await bridge.send('VKWebAppSetSwipeSettings', { history: true });
  } catch (err) {
    console.log('Ошибка выполнения VKWebAppSetSwipeSettings:', err);
  }
};
