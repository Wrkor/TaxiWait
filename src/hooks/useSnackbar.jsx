import { useState } from 'react'

/**
 * Хук, который содержит актуальный тост, который необхдимо выкинуть
 */
export const useSnackbar = () => {
  const [snackbarSuccess, SetSnackbarSuccess] = useState("")
  const [snackbarError, SetSnackbarError] = useState("")

  return { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError }
};

export default useSnackbar