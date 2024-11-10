import { useContext } from 'react'
import { DataContext } from '../context/data'

const defaultValues = {
  snackbarSuccess: "",
  snackbarError: "",
}

export const useSnackbar = () => {
  const dataContext = useContext(DataContext)

  const snackbarSuccess = dataContext?.data?.snackbar?.snackbarSuccess
  const snackbarError = dataContext?.data?.snackbar?.snackbarError

  const SetSnackbarSuccess = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      snackbar: {
        ...defaultValues,
				...dataContext?.data?.snackbar,
        snackbarSuccess: value,
      }
    })
	}

  const SetSnackbarError = (value) => {
		dataContext.setData({
      ...dataContext?.data,
      snackbar: {
        ...defaultValues,
				...dataContext?.data?.snackbar,
        snackbarError: value,
      }
    })
	}

  return { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError }
};

export default useSnackbar