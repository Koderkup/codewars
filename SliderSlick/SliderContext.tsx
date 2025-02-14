'use client'
import { createContext, Dispatch, MutableRefObject, SetStateAction, useContext } from 'react'
import Slider from 'react-slick'
import { EmblaCarouselType } from 'embla-carousel'
interface SliderContextType {
	currentIndex: number
	setCurrentIndex: Dispatch<SetStateAction<number>>
	totalSlides: number
	setTotalSlides: Dispatch<SetStateAction<number>>
	slickNext: () => void
	slickPrev: () => void
	slickGoTo: (index: number) => void
	dots: boolean
	sliderRef: MutableRefObject<EmblaCarouselType | null>
	activeLong?: boolean
	wait: boolean
	setWait: Dispatch<SetStateAction<boolean>>
	speed: number
}

const SliderContext = createContext<SliderContextType | undefined>(undefined)

export const useSliderContext = () => {
	const context = useContext(SliderContext)
	if (!context) {
		throw new Error('useSliderContext must be used within a Slider component')
	}
	return context
}

export default SliderContext
