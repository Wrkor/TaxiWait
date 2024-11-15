import { createContext, useState } from 'react'
import initialValues from './initialValues'

export const SnackbarContext = createContext()

export const SnackbarProvider = ({ children }) => {
  const [snackbar, SetSnackbar] = useState(initialValues.snackbar)

  return (
    <SnackbarContext.Provider value={{ snackbar, SetSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider