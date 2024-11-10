import { useContext, useEffect, useState } from 'react'
import { getUserActiveMonitoring } from '../api/'
import { DataContext } from '../context/data'
import { normalizeError } from '../helpers'

export const useMonitoring = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dataContext = useContext(DataContext)
  
  const monitoring = dataContext?.data?.monitoring
  const account = dataContext?.data?.account

  useEffect(() => {
    if (!account || !!monitoring) {
      setLoading(false)
    }
    
    async () => {
      try {
        const monitoring = await getUserActiveMonitoring(account.id)
  
        dataContext.setData({
          ...dataContext?.data,
          monitoring,
        });
      } 
      catch (e) {
        setError(normalizeError('Ошибка получения активного заказа пользователя:'))
      }
      finally {
        setLoading(false)
      }
    }
  }, [monitoring, account])

  return { isLoading, error, monitoring }
}

export default useMonitoring