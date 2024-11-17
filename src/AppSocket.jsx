import { App } from './App'
import SocketProvider from './context/SocketProvider'
import { useUserContext } from './hooks'

export const AppSocket = () => {
  const { userLaunchParams } = useUserContext()

  return (
    <SocketProvider userLaunchParams={userLaunchParams}>
      <App/>
    </SocketProvider>
  )
}
