import React, { ReactNode, useCallback } from 'react'
import { Button } from '../ui'
import styles from './style.module.css'
import { useSliderContext } from './SliderContext'
import cn from 'classnames'

interface PrevArrowProps {
	children: ReactNode
	onClick?: () => void
}

const PrevArrow: React.FC<PrevArrowProps> = ({ children }) => {
	const { slickPrev } = useSliderContext()
const handleClick = useCallback(() => {
	slickPrev()
}, [slickPrev])
	return (
		<Button className={cn(styles['slider-button-prev'])} onClick={handleClick}>
			{children}
		</Button>
	)
}

export default PrevArrow
