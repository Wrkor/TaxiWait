export const DashSVG = ({ fill, ...props }) => {

  return (
		<svg 
			width="36" 
			height="5" 
			viewBox="0 0 36 5" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg" {...props}>
			<rect
			 	width="36" 
				height="5" 
				rx="2.5" 
				fill={fill} 
				fillOpacity="0.3"/>
		</svg>
  )
}

export default DashSVG