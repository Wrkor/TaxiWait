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
			fullScreen={false}
			overflowHeight={overflowHeight}
			marginTop={60}
		>
			<div style={{ height: height }} className={classes.body}>
				{children}
			</div>
		</SwipeableBottomSheet>
  )
}

export default SwipeableContainer
