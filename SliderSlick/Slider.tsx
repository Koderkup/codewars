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
	const [wait, setWait] = useState<boolean>(false)
	const [speed, setSpeed] = useState<number>(1500)

	const sliderRef = useRef<EmblaCarouselType | null>(null)

	const slickNext = () => {
		// 
		sliderRef.current?.scrollNext()
	}

	const slickPrev = () => {
		 sliderRef.current?.scrollPrev()
		// sliderRef.current?.slickPause()
		// setSpeed(500)
		// setWait(false)
		// sliderRef.current?.slickPrev()
		// setWait(true)
		// setSpeed(1500)
		// sliderRef.current?.slickPlay()
	}

	const slickGoTo = (index: number) => {
		// setWait(false)
		// sliderRef.current?.slickGoTo(index)
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
				wait,
				setWait,
				speed,
			}}
		>
			<div className={styles['slider-container']}>{children}</div>
		</SliderContext.Provider>
	)
}

Slider.Controls = Controls
Slider.Lent = Lent

export default Slider
