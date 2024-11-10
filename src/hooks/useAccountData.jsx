import { useContext } from 'react'
import { DataContext } from '../context/data'

export const useAccountData = () => {
  const dataContext = useContext(DataContext)
	
  const account = dataContext?.data?.account
  const userVK = dataContext?.data?.account?.userVK

	return {account, userVK }
}
export default useAccountData