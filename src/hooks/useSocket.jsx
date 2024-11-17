import { useContext } from 'react'
import { SocketContext } from '../context/SocketProvider'

/**
 * Хук, который содержит соединение с socket io
 */
export const useSocket = () => {
  const socketConnection = useContext(SocketContext);

  const socket = socketConnection?.socket
  const isConnect = socketConnection?.isConnect

  return {socket, isConnect}
};

export default useSocket