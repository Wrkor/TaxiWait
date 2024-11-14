import { createContext, useState } from 'react'
import initialValues from './initialValues'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, SetUser] = useState(initialValues.user)

  return (
    <UserContext.Provider value={{ user, SetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider