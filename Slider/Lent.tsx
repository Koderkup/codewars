'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useSliderContext } from './SliderContext'
import styles from './style.module.css'
import cn from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
interface LentProps {
	children: ReactNode
	className?: string 
}

const Lent = ({ children, className }: LentProps) => {
	const { setTotalSlides, setCurrentIndex, sliderRef } = useSliderContext()
	const totalSlides = React.Children.count(children)
	const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' })

	useEffect(() => {
		setTotalSlides(totalSlides)
	}, [totalSlides, setTotalSlides])

	useEffect(() => {
		if (!embla) return
		const onSelect = () => {
			setCurrentIndex(embla.selectedScrollSnap())
		}
		sliderRef.current = embla
		embla.on('select', onSelect)
		const autoplay = setInterval(() => {
			embla.scrollNext()
		}, 4000)

		return () => {
			clearInterval(autoplay)
			embla.off('select', onSelect)
		}
	}, [embla, setCurrentIndex, sliderRef])

	return (
		<section className={styles['Gallery']}>
			<div className={styles['embla']} ref={emblaRef}>
				<div className={styles['embla__container']}>
					{React.Children.map(children, child => (
						<div
							className={cn(styles['embla__slide'], {
								[className!]: Boolean(className)
							})}
						>
							{child}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Lent
