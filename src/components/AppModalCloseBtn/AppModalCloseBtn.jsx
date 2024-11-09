import { Icon24Dismiss } from '@vkontakte/icons'
import { PanelHeaderButton } from '@vkontakte/vkui'
import { usePlatforms } from '../../hooks/'
import styles from './AppModalCloseBtn.module.scss'

const AppModalCloseBtn = ({ onClose }) => {
  const { isMobile } = usePlatforms()

  return (
    !isMobile 
    ?
      <PanelHeaderButton className={styles.headerCloseBtn} onClick={onClose}>
        <Icon24Dismiss />
      </PanelHeaderButton>
    :
      <></>
  )
}

export default AppModalCloseBtn
