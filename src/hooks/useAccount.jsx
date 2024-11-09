import bridge from '@vkontakte/vk-bridge'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/data'
import { normalizeError } from '../helpers/'

export const useAccount = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dataContext = useContext(DataContext)
  const account = dataContext?.data?.account

  const loadUserInfo = async () => {
    if (!account?.isAuthVK) {
      setLoading(false)
      return;
    }

    try {
      const userInfo = await bridge.send('VKWebAppGetUserInfo')

      dataContext?.setData({
        ...dataContext.data,
        account: {
          ...dataContext.data.account,
          isAuthVK: true,
          userVK: {
            ...userInfo,
          },
        },
      });
    } catch (e) {
      setError(normalizeError(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserInfo()
  }, [])

  return {
    isLoading,
    error,
    account
  }
}

export default useAccount