import bridge from '@vkontakte/vk-bridge'
import { useEffect } from 'react'
import { mockOnboardingSlides } from '../config/mockOnboardingSlides'
import { onbordingShowGet, onbordingShowSet } from '../helpers'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import globalConstants from '../config/globalConstants'

export const useOnboardSlides = () => {

  const routerNavigator = useRouteNavigator()

  useEffect(() => {
    const showOnboarding = async () => {
      const isOnbordingWasShown = await onbordingShowGet()

      if(isOnbordingWasShown) return

      const showOnboardSlidesResult = await bridge.send('VKWebAppShowSlidesSheet', mockOnboardingSlides);

      if(showOnboardSlidesResult.result){
        await onbordingShowSet()
        routerNavigator.showModal(globalConstants.modal.confirmShareOrder)
      }
    }

    showOnboarding()
  }, [])
}

export default useOnboardSlides