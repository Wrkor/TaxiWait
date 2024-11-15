import { Spacing } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { MonitoringSuccessContainer, MonitoringWaitContainer, RoadContainer, SwipeableContainer } from '../'
import { useMapContext, useMonitoringContext } from '../../hooks'
import { DashSVG } from '../SVG'

export const SwipeableRoadPanel = () => {
  const [isFullScreenSwipeableContainer, SetFullScreenSwipeableContainer] = useState(false)
  const [isExpandSwipeableContainer, SetExpandSwipeableContainer] = useState(false)
  const [isLockSwipeableSheet, SetLockSwipeableSheet] = useState(false)
  const { isRoadSelect } = useMapContext()

  const { isMonitoringRun, isMonitoringSuccess } = useMonitoringContext()

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
		// <div className='wrapperSwape' style={{position: 'absolute', width: '100%', height: '100%'}}>

			<SwipeableContainer
				isFullScreen={isFullScreenSwipeableContainer}
				isExpand={isExpandSwipeableContainer}
				SetExpand={SetExpandSwipeableContainer}
				height="500px"
				overflowHeight={isLockSwipeableSheet ? 250 : 400}
			>
				<Spacing size={8} />
				<DashSVG fill="#3C3C43" />
				<Spacing size={8} />
				{
					isMonitoringRun
						?
						isMonitoringSuccess
							?
							<MonitoringSuccessContainer />
							:
							<MonitoringWaitContainer />
						:
						<>
							<RoadContainer OnOpenSelect={OnOpenSelect} OnCloseSelect={OnCloseSelect} />
						</>
				}

			</SwipeableContainer>
		// </div>
	)
}

export default SwipeableRoadPanel