import { useContext } from 'react'
import { SnackbarContext } from '../context/SnackbarProvider'

/**
 * Хук, который содержит актуальный тост, который необхдимо выкинуть
 */
export const useSnackbarContext = () => {
  const snackbarContext = useContext(SnackbarContext)

  const snackbarSuccess = snackbarContext?.snackbar?.snackbarSuccess;
  const snackbarError = snackbarContext?.snackbar?.snackbarError;
  
  const SetSnackbarError = (value) => {
    snackbarContext.SetSnackbar(prev => ({
      ...prev,
      snackbarError: value
    }))
  } 

  const SetSnackbarSuccess = (value) => {
    snackbarContext.SetSnackbar(prev => ({
      ...prev,
      snackbarSuccess: value
    }))
  } 

  return { snackbarContext, snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError }
};

export default useSnackbarContext