import { Map, YMaps } from '@pbe/react-yandex-maps'
import { Panel, PanelHeader } from '@vkontakte/vkui'
import { useRef, useState } from 'react'
import { SnackbarError, SnackbarSuccess, SwipeableRoadPanel } from '../components'
import { useSnackbarContext } from '../hooks'

export const MapPanel = ({ id }) => {
  const { snackbarSuccess, SetSnackbarSuccess, snackbarError, SetSnackbarError } = useSnackbarContext()
  const [isReadyMap, setLoadingMap] = useState("true")

  const map = useRef(null);
  const mapState = {
      center: [52.293769, 104.288116],//нач координат
      zoom: 8
  };

  const addRoute = (ymaps) => {
      const pointA = [52.262466, 104.268865]; // Москва
      const pointB = [52.293769, 104.288116] //[59.918072, 30.304908]; // Санкт-Петербург

      const multiRoute = new ymaps.multiRouter.MultiRoute(
          {
              referencePoints: [pointA, pointB],
              params: {
                  routingMode: "auto",
                  avoidTrafficJams: false,
              }
          },
          {
              boundsAutoApply: true
          }
      )
      map.current.geoObjects.add(multiRoute);
  }
  
  return (
    <Panel id={id}>
      <PanelHeader delimiter="none">Жду такси</PanelHeader>
            <YMaps query={{ apikey: '1f9f5ab8-2392-46e3-abe2-c0ccca14b78a' }}>
                <Map
                    width={'100vw'} height={'75vh'}
                    modules={["multiRouter.MultiRoute"]}
                    state={mapState}
                    instanceRef={map}
                    onLoad={addRoute}
                //onError={() => setLoadingMap('error')}
                ></Map>
            </YMaps>
            <SwipeableRoadPanel />
      {
        snackbarSuccess?.length > 0 && 
        <SnackbarSuccess onClose={() => SetSnackbarSuccess("")} text={snackbarSuccess}/>
      }
      {
        snackbarError?.length > 0  && 
        <SnackbarError onClose={() => SetSnackbarError("")} text={snackbarError}/>
      }
    </Panel>
  )
}


export default MapPanel