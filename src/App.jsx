import { useActiveVkuiLocation, usePopout } from '@vkontakte/vk-mini-apps-router'
import { Epic, SplitCol, SplitLayout, View } from '@vkontakte/vkui'
import './App.scss'
import { AppModalRoot, AppTabBar } from './components/index'
import globalConstants from './config/globalConstants'
import { enableSwipe } from './helpers'
import { useAccount, useMonitoring, useOnboardSlides } from './hooks'
import { AccountPanel, MapPanel, OrdersPanel } from './panels/'

export const App = () => {
  const { view: activeView, panel: activePanel = globalConstants.panel.map } = useActiveVkuiLocation()
  const routerPopout = usePopout()

  enableSwipe()
  useOnboardSlides()
  useAccount()
  useMonitoring()

  return (
    <SplitLayout modal={<AppModalRoot />} popout={routerPopout}>
      <SplitCol className="bgContent">
        <Epic
          activeStory={activeView ?? globalConstants.routes.main}
          tabbar={
            <AppTabBar
              activeStory={activeView}
            />
          }
        >
          <View id={globalConstants.view.account} activePanel={activePanel}>
            <AccountPanel id={globalConstants.panel.account} />
            <OrdersPanel id={globalConstants.panel.orders} />
          </View>
          <View id={globalConstants.view.monitoring} activePanel={activePanel}>
            <MapPanel id={globalConstants.panel.map} />
            <OrdersPanel id={globalConstants.panel.orders} />
          </View>
        </Epic> 
      </SplitCol>
    </SplitLayout>
  )
}
