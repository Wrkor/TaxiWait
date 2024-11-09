import { useContext, useEffect } from 'react'
import { getUserActiveMonitoring } from '../api/'
import { DataContext } from '../context/data'

export const useMonitoring = () => {
  const dataContext = useContext(DataContext)
  const monitoring = dataContext?.data?.monitoring
  const account = dataContext?.data?.account

  const isMonitoring = monitoring?.isMonitoring
  const isCompleteSuccess = monitoring?.isCompleteSuccess
  const isCompleteCancel = monitoring?.isCompleteCancel

  useEffect(() => {
    if (!account || !!monitoring) {
      return;
    }

    const loadActiveOrder = async () => {
      try {
        const getMonitoring = await getUserActiveMonitoring(account.id)

        dataContext.setData({
          ...dataContext.data,
          monitoring: getMonitoring,
        });
      } 
      catch (e) {
        console.log('Ошибка получения активного заказа пользователя:', e)
      }
    }
    loadActiveOrder()
  }, [monitoring, account])

  return { isMonitoring, isCompleteSuccess, isCompleteCancel, monitoring }
}

export default useMonitoring