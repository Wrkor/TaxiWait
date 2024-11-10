import { Icon56GhostOutline } from '@vkontakte/icons'
import { Button, Placeholder } from '@vkontakte/vkui'

const NetworkError = ({ action, text }) => {
  return (
    <Placeholder
      stretched
      icon={<Icon56GhostOutline />}
      header={text}
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
