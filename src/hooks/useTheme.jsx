import { useAppearance } from '@vkontakte/vk-bridge-react'
import { Appearance } from '@vkontakte/vkui'

export const useTheme = () => {
  const appearance = useAppearance()

  const isDarkTheme = appearance === Appearance.DARK
  const isLightTheme = appearance === Appearance.LIGHT
  return { isDarkTheme, isLightTheme }
};

export default useTheme