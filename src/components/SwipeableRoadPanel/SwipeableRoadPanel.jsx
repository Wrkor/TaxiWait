import { Spacing } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { MonitoringSuccessContainer, MonitoringWaitContainer, RoadContainer, SwipeableContainer } from '../'
import { useMapData, useMonitoringData } from '../../hooks'
import { DashSVG } from '../SVG'

export const SwipeableRoadPanel = () => {
  const [isFullScreenSwipeableContainer, SetFullScreenSwipeableContainer] = useState(false)
  const [isExpandSwipeableContainer, SetExpandSwipeableContainer] = useState(false)
  const [isLockSwipeableSheet, SetLockSwipeableSheet] = useState(false)
  const {isRoadSelect} = useMapData()

  const {isMonitoringRun, isMonitoringSuccess} = useMonitoringData()

  const OnOpenSelect = () => {
		if (!isRoadSelect) {
			SetExpandSwipeableContainer(true)
			SetFullScreenSwipeableContainer(true)
		}
  }

  const OnCloseSelect = () => {
		SetExpandSwipeableContainer(false)
    SetFullScreenSwipeableContainer(false)
  }

  useEffect(() => {
    if (isRoadSelect) {
      SetExpandSwipeableContainer(true)
      SetFullScreenSwipeableContainer(false)
    }

    SetLockSwipeableSheet(isRoadSelect)
  }, [isRoadSelect])

  return (
		<SwipeableContainer
			isFullScreen={isFullScreenSwipeableContainer}
			isExpand={isExpandSwipeableContainer}
			SetExpand={SetExpandSwipeableContainer}
			height="500px"
			overflowHeight={isLockSwipeableSheet ? 560 : 360}
		>
			<Spacing size={8} />
			<DashSVG fill="#3C3C43"/>
			<Spacing size={8} />
			{
				isMonitoringRun
				?
					isMonitoringSuccess
					?
						<MonitoringSuccessContainer/>
					:
						<MonitoringWaitContainer/>
				:
					<>
						<RoadContainer OnOpenSelect={OnOpenSelect} OnCloseSelect={OnCloseSelect}/>
					</>
			}
			
		</SwipeableContainer>
  )
}

export default SwipeableRoadPanel