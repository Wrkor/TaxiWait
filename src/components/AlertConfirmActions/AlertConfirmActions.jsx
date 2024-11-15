import { Alert, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


const CancelOrderConfirmPopout = ({ onClose, onAgree, onDisagree, textButtonAgree, textButtonDisagree, header, text, ...props }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <div style={{zIndex: 1300}}>
      <Alert
        actions={[
          {
            title: textButtonAgree,
            mode: 'destructive',
            action: onAgree,
          },
          {
            title: textButtonDisagree,
            mode: 'cancel',
            action: onDisagree
          },
        ]}
        actionsLayout="horizontal"
        dismissButtonMode='outside'
        onClose={onClose}
        header={header}
        text={text}
      />
    </div>
  );
};

export default CancelOrderConfirmPopout;