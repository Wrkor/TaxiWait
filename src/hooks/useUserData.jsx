import { useEffect } from 'react'
import useMapContext from './useMapContext'
import useSnackbarContext from './useSnackbarContext'
import useSocket from './useSocket'
import useTaxiContext from './useTaxiContext'
import useUserContext from './useUserContext'

/**
 * Хук, который подписывается на изменение данных пользователя
 */
export const useUserData = () => {
    const { SetUserData } = useUserContext()
    const { geocodeFrom, geocodeTo, SetGeocodeFrom, SetGeocodeTo } = useMapContext()
    const { SetSnackbarError, SetSnackbarWarning, SetSnackbarSuccess } = useSnackbarContext()
    const { SetDiscountPrice } = useTaxiContext()

    const {socket, isConnect} = useSocket()

    useEffect(() => {
        if (socket) {
            socket.on('message', ({ event, data }) => {
                if (event === 'userData' && data?.data?.userId) {
                    SetUserData(data?.data)

                    if (data?.data?.monitoringParams) {
                        if (!!data?.data?.monitoringParams?.targetPrice)
                            SetDiscountPrice(data?.data?.monitoringParams?.targetPrice)
                        
                        if (!!data?.data?.monitoringParams?.query && !geocodeFrom.long && !geocodeTo.long) {
                            const geocodes = data?.data?.monitoringParams?.query.split("~")

                            if (geocodes?.length != 2)
                                return

                            const geocodesFrom = geocodes[0].split(",")
                            const geocodesTo = geocodes[1].split(",")

                            if (geocodesFrom?.length != 2 || geocodesTo?.length != 2)
                                return

                            SetGeocodeFrom([Number(geocodesFrom[0]),Number(geocodesFrom[1])])
                            SetGeocodeTo([Number(geocodesTo[0]),Number(geocodesTo[1])])
                        }

                    }
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