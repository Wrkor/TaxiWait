import bridge from '@vkontakte/vk-bridge'

export const appStorageSet = async (key, value) =>
  bridge
    .send('VKWebAppStorageSet', {
      key,
      value,
    })
    .catch(() => {
      console.log(`Ошибка записи ключа ${key}, значение ${value}`);
    });
