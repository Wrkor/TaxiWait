import { Icon28ErrorCircleOutline } from '@vkontakte/icons'
import { Snackbar } from '@vkontakte/vkui'
import classes from './SnackbarError.module.scss'

const SnackbarError = ({ onClose, text, duration, ...props }) => (
  <Snackbar
    {...props}
    placement="top"
    duration={duration ?? 1000}
    onClose={onClose}
    before={<Icon28ErrorCircleOutline className={classes.errorIcon} />}
  >
    {text}
  </Snackbar>
);

export default SnackbarError;
