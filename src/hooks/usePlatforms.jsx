import {
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui'

/**
 * Хук, который содержит активную платформу
 */
export const usePlatforms = () => {
  const { sizeX } = useAdaptivityConditionalRender()
  const platform = usePlatform()

  const isMobile = sizeX.compact && (platform === Platform.ANDROID || platform === Platform.IOS)

  return { isMobile, platform }
};

export default usePlatforms