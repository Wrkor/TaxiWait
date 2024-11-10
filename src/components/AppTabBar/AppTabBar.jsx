import { Icon28CarOutline, Icon28UserCircleOutline } from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Badge, Tabbar, TabbarItem } from '@vkontakte/vkui'
import globalConstants from '../../config/globalConstants'
import { useMonitoringData, usePlatforms } from '../../hooks/'

const AppTabBar = ({ activeStory }) => {
  const routeNavigator = useRouteNavigator();
  const { isMonitoringRun, isMonitoringSuccess } = useMonitoringData();
  const {isMobile, isFocusedInput} = usePlatforms()

  return (
    <Tabbar mode="vertical" hidden={isMobile && isFocusedInput}>
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
        text="Профиль"
        indicator={
          isMonitoringRun ? 
            <Badge mode="prominent" />
          :
          (isMonitoringSuccess) &&
          <Badge mode="new"/>
        }
      >
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default AppTabBar;
