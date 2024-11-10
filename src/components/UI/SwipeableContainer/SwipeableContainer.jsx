import SwipeableBottomSheet from 'react-swipeable-bottom-sheet'
import classes from './SwipeableContainer.module.scss'

const SwipeableContainer = ({children, isExpand, SetExpand, isFullScreen, height, overflowHeight, ...props}) => {

  return (
    <SwipeableBottomSheet
			{...props}
			className={classes.container}
			open={isExpand}
			overlay={false}
			topShadow={false}
			onChange={SetExpand}
			fullScreen={isFullScreen}
			overflowHeight={overflowHeight}
		>
			<div style={{ height: height }} className={classes.body}>
				{children}
			</div>
		</SwipeableBottomSheet>
  )
}

export default SwipeableContainer
