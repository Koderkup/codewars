import React, { ReactNode, useCallback } from 'react'
import { Button } from '../ui'
import styles from './style.module.css'
import { useSliderContext } from './SliderContext'
import cn from 'classnames'

interface NextArrowProps {
	children: ReactNode
}

const NextArrow: React.FC<NextArrowProps> = ({ children }) => {
	const { slickNext } = useSliderContext()
	const handleClick = useCallback(() => {
		slickNext()
	}, [slickNext])
	return (
		<Button className={cn(styles['slider-button-next'])} onClick={slickNext}>
			{children}
		</Button>
	)
}

export default NextArrow
