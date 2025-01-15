/*Бегущая строка 

.wrapper {
    display: flex;
    overflow: hidden;
}

.text-top {
    padding: 0 40px 0 0;
    white-space: nowrap;
    display: inline-block;
    animation: marqueeTop2 20s infinite linear;
    animation-delay: -10s;
    color: var(--Text-White-1000-color);
}

.text-top:first-of-type {
    animation: marqueeTop1 20s infinite linear;
    animation-delay: -20s;
}

.text-bottom {
    color: var(--Text-Black-900-color);
    padding: 0 40px 0 0;
    white-space: nowrap;
    display: inline-block;
    animation: marqueeBottom2 20s infinite linear;
    animation-delay: -10s;
}

.text-bottom:first-of-type {
    animation: marqueeBottom1 20s infinite linear;
    animation-delay: -20s;
}

@keyframes marqueeTop1 {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes marqueeTop2 {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-200%);
    }
}

@keyframes marqueeBottom1 {
    from {
            transform: translateX(-100%);
        }
    
        to {
            transform: translateX(100%);
        }
}

 @keyframes marqueeBottom2 {
    from {
            transform: translateX(-200%);
        }
    
        to {
            transform: translateX(0%);
        }
} */

/*
import React from 'react'
import styles from './style.module.css'
import cn from 'classnames'

interface DoubleCreepingLineProps {
    text: string
    wrapperCN?: string
}

const DoubleCreepingLine = ({
    text,
    wrapperCN = ''
}: DoubleCreepingLineProps) => {
    return (
        <>
            <div className={`${wrapperCN} ${styles['wrapper']}`}>
                <p className={cn('p-megalarge-bold', styles['text-top'])}>{text}</p>
                <p className={cn('p-megalarge-bold', styles['text-top'])}>{text}</p>
            </div>
            <div className={`${wrapperCN} ${styles['wrapper']}`}>
                <p className={cn('p-megalarge-bold', styles['text-bottom'])}>{text}</p>
                <p className={cn('p-megalarge-bold', styles['text-bottom'])}>{text}</p>
            </div>
        </>
    )
}

export default DoubleCreepingLine
*/


//опускание слайдов в react slick Slider

/*useEffect(() => {
        if (sliderRef.current && sliderRef.current.innerSlider) {
            const slickTrack =
                sliderRef.current?.innerSlider?.list.querySelector('.slick-track')
            if (slickTrack) {
                ;(slickTrack as HTMLElement).style.setProperty(
                    'top',
                    '60px',
                    'important'
                )
            } else {
                console.error('slickTrack is undefined')
            }
        }
    }, [])

*/