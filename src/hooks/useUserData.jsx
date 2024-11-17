import { useEffect } from 'react'
import useSnackbarContext from './useSnackbarContext'
import useSocket from './useSocket'
import useTaxiContext from './useTaxiContext'
import useUserContext from './useUserContext'

/**
 * Хук, который подписывается на изменение данных пользователя
 */
export const useUserData = () => {
    const { SetUserData } = useUserContext()
    const { SetSnackbarError, SetSnackbarWarning, SetSnackbarSuccess } = useSnackbarContext()
    const { SetDiscountPrice } = useTaxiContext()

    const {socket, isConnect} = useSocket()

    useEffect(() => {
        if (socket) {
            socket.on('message', ({ event, data }) => {
                if (event === 'userData' && data?.data?.userId) {
                    SetUserData(data?.data)

                    if (!!data?.data?.monitoringParams?.targetPrice)
                        SetDiscountPrice(data?.data?.monitoringParams?.targetPrice)
                }

                else if (event === 'notification') {
                    if (!data?.type || !data?.message)
                        return
            
                    if (data?.type === "info")
                        SetSnackbarSuccess(data?.message)
            
                    else if (data?.type === "warning")
                        SetSnackbarWarning(data?.message)
            
                    else if (data?.type === "critical")
                        SetSnackbarError(data?.message)
                }

                else if (event === 'error'){
                    SetSnackbarError(data?.message)
                    console.log("[ERROR]", data)
                }
            })
            return () => socket.off('message')
        }
    }, [socket, isConnect])
}

export default useUserData