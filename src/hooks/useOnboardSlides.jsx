import bridge from '@vkontakte/vk-bridge'
import { useEffect } from 'react'
import { mockOnboardingSlides } from '../config/mockOnboardingSlides'
import { onbordingShowGet, onbordingShowSet } from '../helpers'

export const useOnboardSlides = () => {

  useEffect(() => {
    const showOnboarding = async () => {
      const isOnbordingWasShown = await onbordingShowGet()

      if(isOnbordingWasShown) return

      const showOnboardSlidesResult = await bridge.send('VKWebAppShowSlidesSheet', mockOnboardingSlides);

      if(showOnboardSlidesResult.result){
        await onbordingShowSet()
      }
    }

    showOnboarding()
  }, [])
}

export default useOnboardSlides