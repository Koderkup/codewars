import React, { ReactNode } from 'react'
import styles from './style.module.css'
import PrevArrow from './PrevArrow'
import NextArrow from './NextArrow'
interface ArrowsProps {
	children: ReactNode
}
const Arrows = ({ children }: ArrowsProps) => {
	return <div className={styles['btns-wrapper']}>{children}</div>
}
Arrows.NextArrow = NextArrow
Arrows.PrevArrow = PrevArrow
export default Arrows
