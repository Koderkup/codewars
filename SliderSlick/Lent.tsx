'use client'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useSliderContext } from './SliderContext'
import styles from './style.module.css'
import useMediaQuery from '@/utils/hooks/useMediaQuery'
import useEmblaCarousel from 'embla-carousel-react'
interface LentProps {
	children: ReactNode
}

const Lent = ({ children }: LentProps) => {
	const width = useMediaQuery(767)
	const { setTotalSlides, setCurrentIndex, sliderRef, wait, speed } =
		useSliderContext()
	const totalSlides = React.Children.count(children)
	const [centerPadding, setCenterPadding] = useState('0px')
	const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' })
	useEffect(() => {
		const handleResize = () => {
			const padding = width
				? `${window.innerWidth * 0.05}px`
				: `${window.innerWidth * 0.15}px`
			setCenterPadding(padding)
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [width])

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

	const settings = {
		infinite: true,
		speed: speed,
		slidesToShow: 1,
		className: 'center',
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		dots: false,
		autoplaySpeed: 2000,
		beforeChange: (current: number, next: number) => {
			setCurrentIndex(next)
		},
		centerMode: true,
		centerPadding: centerPadding,
		cssEase: 'linear',
		waitForAnimate: wait
	}

	return (
		<section className={styles['Gallery']}>
			<div className={styles['embla']} ref={emblaRef}>
				<div className={styles['embla__container']}>
					{React.Children.map(children, child => (
						<div className={styles['embla__slide']}>{child}</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Lent
