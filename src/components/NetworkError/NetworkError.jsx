import { Icon56GhostOutline } from '@vkontakte/icons'
import { Button, Placeholder } from '@vkontakte/vkui'

const NetworkError = ({ action }) => {
  return (
    <Placeholder
      stretched
      icon={<Icon56GhostOutline />}
      header="Не удалось загрузить"
      action={
        action && (
          <Button size="m" mode="secondary" onClick={action}>
            Повторить
          </Button>
        )
      }
    >
      {action && 'Повторите попытку'}
    </Placeholder>
  );
};

export default NetworkError;
