import { Icon28CheckCircleOutline } from '@vkontakte/icons'
import { Snackbar } from '@vkontakte/vkui'
import classes from './SnackbarWarning.module.scss'

const SnackbarWarning = ({ onClose, text, duration, ...props }) => (
  <Snackbar
    {...props}
    placement="top"
    duration={duration ?? 2000}
    onClose={onClose}
    before={<Icon28CheckCircleOutline className={classes.successIcon} />}
  >
    {text}
  </Snackbar>
);

export default SnackbarWarning;
