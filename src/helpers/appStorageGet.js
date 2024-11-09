import bridge from '@vkontakte/vk-bridge'

export const appStorageGet = async (keys) =>
  bridge
    .send('VKWebAppStorageGet', {
      keys,
    })
    .catch(() => {
      console.log(`Ошибка получения ключей ${keys}`);
    });
