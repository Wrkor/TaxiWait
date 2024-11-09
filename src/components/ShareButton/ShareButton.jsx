import { Icon24ShareOutline } from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
import { Button } from '@vkontakte/vkui'

const ShareButton = ({ link }) => {
  const share = () => {
    try {
      bridge.send('VKWebAppShare', { link });
    } 
    catch (err) {
      console.log('Ошибка выполнения VKWebAppShare:', err);
    }
  };

  return (
    <Button size="l" onClick={share} mode="secondary">
      <Icon24ShareOutline />
    </Button>
  );
};

export default ShareButton;
