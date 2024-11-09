import bridge from '@vkontakte/vk-bridge'
import globalConstants from '../config/globalConstants'

export const getAccessToken = async () => {
  try {
    const data = await bridge.send('VKWebAppGetAuthToken', {
      app_id: globalConstants.app.id,
      scope: 'friends',
    });
    return data.access_token;
  } 
  catch (error) {
    console.log('Ошибка получения access_token:', error);
  }
};
