import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge'
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react'
import { RouterProvider } from '@vkontakte/vk-mini-apps-router'
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { AppSocket } from './AppSocket'
import MapProvider from './context/MapProvider'
import MonitoringProvider from './context/MonitoringProvider'
import SnackbarProvider from './context/SnackbarProvider'
import TaxiProvider from './context/TaxiProvider'
import UserProvider from './context/UserProvider'
import { router } from './routes'
import { transformVKBridgeAdaptivity } from './utils/transformVKBridgeAdaptivity'

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={true}
    >
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={router}>
            <UserProvider>
              <TaxiProvider>
                <MonitoringProvider>
                  <MapProvider>
                    <SnackbarProvider>
                      <AppSocket />
                    </SnackbarProvider>
                  </MapProvider>
                </MonitoringProvider>
              </TaxiProvider>
            </UserProvider>
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
