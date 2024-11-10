import { useActiveVkuiLocation, useRouteNavigator, useSearchParams } from '@vkontakte/vk-mini-apps-router'
import { ModalRoot, ModalPage, ConfirmShareOrderModal} from '@vkontakte/vkui'
import { globalConstants } from '../../config/globalConstants';

const AppModalRoot = () => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const [searchParams] = useSearchParams();

  const onClose = () => {
    routeNavigator.hideModal(searchParams.get('stepBack'));
  };

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      {/* <ModalPage id={globalConstants.modal.confirmShareOrder} onClose={onClose}>
        <ConfirmShareOrderModal onClose={onClose} />
      </ModalPage> */}
      {/* <ModalPage id={globalConstants.modal.confirmOrders} onClose={onClose}>
        <DishModal onClose={onClose} />
      </ModalPage>
      <ModalPage id={globalConstants.modal.confirmRoad} onClose={onClose}>
        <DishModal onClose={onClose} />
      </ModalPage>
      <ModalPage id={globalConstants.modal.monitoringRoad} onClose={onClose}>
        <DishModal onClose={onClose} />
      </ModalPage> */}
    </ModalRoot>
  );
};

export default AppModalRoot;
