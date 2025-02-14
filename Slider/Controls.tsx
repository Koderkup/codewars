import React, { useCallback, useEffect, useMemo } from 'react'
import styles from './style.module.css'
import cn from 'classnames'
import Arrows from './Arrows'
import { useSliderContext } from './SliderContext'
import { progress } from 'motion/react'

type ControlsProps = {
	period?: number
	wide?: boolean
	controlsClassName?: string
}

const Controls = ({
	period = 2000,
	wide = false,
	controlsClassName,
	children
}: ControlsProps & { children?: React.ReactNode }) => {
	const { currentIndex, slickGoTo, totalSlides, dots, activeLong } =
		useSliderContext()

	const dotsArr = useMemo(
		() => Array.from({ length: totalSlides }, (_, i) => i),
		[totalSlides]
	)

	const goToSlide = useCallback(
		(i: number) => {
			slickGoTo(i)
		},
		[slickGoTo]
	)

	return (
		<div
			className={cn(styles['slider-wrapper'], {
				[styles['slider-wrapper-wide']]: wide
			})}
		>
			<div
				className={cn(styles['slider-controls'], {
					[controlsClassName!]: Boolean(controlsClassName),
					[styles['slider-controls-not-wide']]: !wide
				})}
			>
				<div className={styles['slider-dots']}>
					{dots &&
						dotsArr.map(el => (
							<div
								key={el}
								className={cn(styles['progress-wrapper'])}
								onClick={() => goToSlide(el)}
							>
								<div
									className={cn(styles['progress'])}
									style={{
										width: `${activeLong && el === currentIndex ? '72px' : '40px'}`
									}}
								>
									<div
										className={styles['progress-line']}
										style={{
											width: `${el === currentIndex ? '100%' : '0%'}`,
											transition: `width ${period / 1000}s`,
											backgroundColor:
												el === currentIndex
													? 'var(--Brand-Primary-1000-color)'
													: 'transparent'
										}}
									></div>
								</div>
							</div>
						))}
				</div>
				{children}
			</div>
		</div>
	)
}
Controls.Arrows = Arrows
export default Controls
