import {
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui'
import { useContext } from 'react'
import { DataContext } from '../context/data'

export const usePlatforms = () => {
  const { sizeX } = useAdaptivityConditionalRender()
  const dataContext = useContext(DataContext)
  const platform = usePlatform()

  const isFocusedInput = dataContext?.data?.platform?.isFocusedInput
  const isMobile = sizeX.compact && (platform === Platform.ANDROID || platform === Platform.IOS)
  
  const SetFocusedInput = (value) => {
    dataContext.setData({
      ...dataContext?.data,
      platform: {
        isFocusedInput: value,
        isMobile: isMobile
      }
    })
  }

  return { isMobile, isFocusedInput, SetFocusedInput}
};

export default usePlatforms