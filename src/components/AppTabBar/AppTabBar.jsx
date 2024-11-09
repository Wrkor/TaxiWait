import { Icon28CarOutline, Icon28UserCircleOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Badge, Tabbar, TabbarItem } from '@vkontakte/vkui'
import globalConstants from '../../config/globalConstants'
import { useMonitoring } from '../../hooks/'

const AppTabBar = ({ activeStory, isHidden }) => {
  const routeNavigator = useRouteNavigator();
  const { isMonitoring, isCompleteCancel, isCompleteSuccess } = useMonitoring();

  return (
    <Tabbar hidden={isHidden}>
      <TabbarItem
        onClick={() => routeNavigator.push(globalConstants.routes.main)}
        selected={activeStory === globalConstants.view.monitoring}
        data-story={globalConstants.view.monitoring}
        text="Главная"
      >
        <Icon28CarOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => routeNavigator.push(globalConstants.routes.account)}
        selected={activeStory === globalConstants.view.account}
        data-story={activeStory === globalConstants.view.account}
        indicator={
          isMonitoring ? 
            <Badge mode="prominent" aria-label="Новые уведомления" />
          :
          (isCompleteCancel || isCompleteSuccess) &&
          <Badge mode="new" aria-label="Новые уведомления" />
        }
        text="Профиль"
      >
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabBar;
