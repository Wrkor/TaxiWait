import bridge from '@vkontakte/vk-bridge'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { useEffect } from 'react'
import globalConstants from '../config/globalConstants'
import { mockOnboardingSlides } from '../config/mockOnboardingSlides'
import { OnbordingShowGet, OnbordingShowSet } from '../helpers'

/**
 * Хук, который проверяет и вызывает онбординг
 */
export const useOnboardSlides = () => {
  const routerNavigator = useRouteNavigator()

  useEffect(() => {
    
    const fetching = async () => {
      const isOnbordingWasShown = await OnbordingShowGet()

      if(isOnbordingWasShown) 
        return

      try {
        const data = await bridge.send('VKWebAppShowSlidesSheet', mockOnboardingSlides);
  
        if(!!data.result){
          await OnbordingShowSet("true")
          routerNavigator.showModal(globalConstants.modal.confirmShareOrder)
        }
      }
      catch (e) {
        
        // Получена ошибка

        console.error('[ERROR] useOnboardSlides: ', e);
        setError(normalizeError('Ошибка получения онбординга'))
      }
    }

    fetching()
  }, [])
}

export default useOnboardSlides