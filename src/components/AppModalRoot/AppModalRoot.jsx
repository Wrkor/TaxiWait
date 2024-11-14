import { useActiveVkuiLocation, useRouteNavigator, useSearchParams } from '@vkontakte/vk-mini-apps-router'
import { ModalPage, ModalRoot } from '@vkontakte/vkui'
import { globalConstants } from '../../config/globalConstants'
import ShareOrderModal from '../ShareOrderModal/ShareOrderModal'

const AppModalRoot = () => {
  const { modal: activeModal } = useActiveVkuiLocation()
  const routeNavigator = useRouteNavigator()
  const [searchParams] = useSearchParams()

  const onClose = () => {
    routeNavigator.hideModal(searchParams.get('stepBack'))
  };

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <ModalPage id={globalConstants.modal.confirmShareOrder} onClose={onClose}>
        <ShareOrderModal onClose={onClose}/>
      </ModalPage>
    </ModalRoot>
  );
};

export default AppModalRoot;
