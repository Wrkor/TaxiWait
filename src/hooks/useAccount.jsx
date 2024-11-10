import bridge from '@vkontakte/vk-bridge'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/data'
import { normalizeError } from '../helpers/'

export const useAccount = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dataContext = useContext(DataContext)
  
  const account = dataContext?.data?.account

  useEffect(() => {
    setLoading(true)
    const fetching = async () => {
      try {
        const userVK = await bridge.send('VKWebAppGetUserInfo')
        dataContext?.setData({
          ...dataContext?.data,
          account: {
            ...dataContext?.data?.account,
            userVK,
          },
        });
      } 
      catch (e) {
        setError(normalizeError(e))
      } 
      finally {
        setLoading(false)
      }
    }
    fetching()
  }, [])

  return {
    isLoading,
    error,
    account
  }
}

export default useAccount