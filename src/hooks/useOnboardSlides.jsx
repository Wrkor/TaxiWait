import bridge from '@vkontakte/vk-bridge'
import { useEffect } from 'react'
import globalConstants from '../config/globalConstants'
import { mockOnboardingSlides } from '../config/mockOnboardingSlides'
import { appStorageGet, appStorageSet } from '../helpers'

export const useOnboardSlides = () => {

  useEffect(() => {
    const showOnboarding = async () => {
      const storageKeysResult = await appStorageGet([globalConstants.storage.onboarding.key])

      if (storageKeysResult?.keys?.[0]?.value !== globalConstants.storage.onboarding.confrim) {

        const showOnboardSlidesResult = await bridge.send(
          'VKWebAppShowSlidesSheet',
          mockOnboardingSlides,
        );

        appStorageSet(
          globalConstants.storage.onboarding.key,
          showOnboardSlidesResult.action,
        )
      }
    }

    showOnboarding()
  }, [])
}

export default useOnboardSlides