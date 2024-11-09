import { Icon28ErrorCircleOutline } from '@vkontakte/icons'
import { Snackbar } from '@vkontakte/vkui'
import styles from './ErrorSnackbar.module.scss'

const ErrorSnackbar = ({ onClose }) => (
  <Snackbar
    onClose={onClose}
    before={<Icon28ErrorCircleOutline className={styles.errorIcon} />}
  >
    Что-то пошло не так
  </Snackbar>
);

export default ErrorSnackbar;
