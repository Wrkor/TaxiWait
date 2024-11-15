import bridge from '@vkontakte/vk-bridge'

export const EnableSwipe = async () => {
  if (!await bridge.supportsAsync('VKWebAppSetSwipeSettings')) {
    return;
  }

  try {
    await bridge.send('VKWebAppSetSwipeSettings', { history: true });
  } 
  catch (e) {
    console.error('Ошибка выполнения VKWebAppSetSwipeSettings:', e);
  }
};
