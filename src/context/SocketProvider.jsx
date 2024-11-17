import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import globalConstants from '../config/globalConstants'

export const SocketContext = createContext()

export const SocketProvider = ({ children, userLaunchParams  }) => {
  const [socket, SetSocket] = useState(null)
  const [isConnect, SetConnect] = useState(false)

  useEffect(() => {
    if (!userLaunchParams?.vk_user_id) 
      return

    const newSocket = io(`${globalConstants.ws}/socket`, {
      query: userLaunchParams
    })

    newSocket.on('connect', () => {
      console.log('Connected to socket server')
      SetConnect(true)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server')
      SetConnect(false)
    })

    SetSocket(newSocket)

    return () => newSocket.disconnect()
  }, [userLaunchParams])

  return (
    <SocketContext.Provider value={{socket, isConnect}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider