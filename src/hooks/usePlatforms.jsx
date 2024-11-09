import {
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui'

export const usePlatforms = () => {
  const { sizeX } = useAdaptivityConditionalRender()
  const platform = usePlatform()
  
  const isMobile =
    sizeX.compact &&
    (platform === Platform.ANDROID || platform === Platform.IOS)

    return { isMobile }
};

export default usePlatforms