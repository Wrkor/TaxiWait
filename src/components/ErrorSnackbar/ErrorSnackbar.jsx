import { Icon28ErrorCircleOutline } from '@vkontakte/icons'
import { Snackbar } from '@vkontakte/vkui'
import styles from './ErrorSnackbar.module.scss'

const ErrorSnackbar = ({ onClose, text, duration, ...props }) => (
  <Snackbar
    {...props}
    placement="top"
    duration={duration ?? 2000}
    onClose={onClose}
    before={<Icon28ErrorCircleOutline className={styles.errorIcon} />}
  >
    {text}
  </Snackbar>
);

export default ErrorSnackbar;
