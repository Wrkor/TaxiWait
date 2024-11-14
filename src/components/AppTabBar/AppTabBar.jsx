import { Icon28CarOutline, Icon28UserCircleOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Badge, Tabbar, TabbarItem } from '@vkontakte/vkui'
import globalConstants from '../../config/globalConstants'
import { useMonitoringContext } from '../../hooks/'

const AppTabBar = ({ activeStory }) => {
  const routeNavigator = useRouteNavigator()
  const { isMonitoringRun, isMonitoringSuccess } = useMonitoringContext()

  return (
    <Tabbar mode="vertical">
      <TabbarItem
        onClick={() => routeNavigator.push(globalConstants.routes.main)}
        selected={activeStory === globalConstants.view.monitoring}
        data-story={globalConstants.view.monitoring}
        text="Главная"
        indicator={
          isMonitoringRun ? 
            <Badge mode="prominent" />
          :
          (isMonitoringSuccess) &&
          <Badge mode="new"/>
        }
      >
        <Icon28CarOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => routeNavigator.push(globalConstants.routes.account)}
        selected={activeStory === globalConstants.view.account}
        data-story={activeStory === globalConstants.view.account}
        text="Профиль"
      >
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabBar;
