'use client'
import React, { useState, ReactNode, useRef } from 'react'
import SliderContext from './SliderContext'
import styles from './style.module.css'
import Controls from './Controls'
import Lent from './Lent'
import { EmblaCarouselType } from 'embla-carousel'

interface SliderProps {
	children: ReactNode
	dots: boolean
	activeLong?: boolean
}

const Slider = ({ children, dots, activeLong = false }: SliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [totalSlides, setTotalSlides] = useState(0)
	const sliderRef = useRef<EmblaCarouselType | null>(null)

	const slickNext = () => {
		sliderRef.current?.scrollNext()
	}

	const slickPrev = () => {
		 sliderRef.current?.scrollPrev()
	}

	const slickGoTo = (index: number) => {
		sliderRef.current?.scrollTo(index)
	}

	return (
		<SliderContext.Provider
			value={{
				currentIndex,
				setCurrentIndex,
				totalSlides,
				setTotalSlides,
				slickNext,
				slickPrev,
				slickGoTo,
				dots,
				sliderRef,
				activeLong,
			}}
		>
			<div className={styles['slider-container']}>{children}</div>
		</SliderContext.Provider>
	)
}

Slider.Controls = Controls
Slider.Lent = Lent

export default Slider
