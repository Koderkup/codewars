/*"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import cn from "classnames";
import {
  SliderArrowLeft,
  SliderArrowLeftColor,
  SliderArrowRight,
  SliderArrowRightColor,
} from "../Icons";

type SmallSliderProps = {
  period: number;
  slidesCount: number | undefined;
  slickNext: () => void;
  slickPrev: () => void;
  slickGoTo: (e: number) => void;
  wide: boolean;
};

export const SmallSliderLK = ({
  period,
  slidesCount = 0,
  slickNext,
  slickPrev,
  slickGoTo,
  wide = false,
}: SmallSliderProps) => {
  const [currSlide, setSlide] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const interval = useRef<NodeJS.Timeout>();
  const dotsArr = useMemo(
    () => Array.from({ length: slidesCount }, (_, i) => i),
    [slidesCount]
  );

  const callbacks = {
    nextSlide: useCallback(() => {
      slickNext();
      setSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : 0));
      setActiveButton("next");
      resetInterval();
    }, [slickNext, slidesCount]),
    prevSlide: useCallback(() => {
      slickPrev();
      setSlide((prev) => (prev > 0 ? prev - 1 : slidesCount - 1));
      setActiveButton("prev");
      resetInterval();
    }, [slickPrev, slidesCount]),
    goToSlide: useCallback(
      (i: number) => {
        slickGoTo(i);
        setSlide(i);
        setActiveButton(null);
        resetInterval();
      },
      [slickGoTo]
    ),
  };

  const resetInterval = useCallback(() => {
    clearInterval(interval.current);
    interval.current = setInterval(callbacks.nextSlide, period);
  }, [period, callbacks.nextSlide]);

  useEffect(() => {
    resetInterval();
    return () => clearInterval(interval.current);
  }, [resetInterval]);

  return (
    <div
      className={cn(styles["slider-wrapper"], {
        [styles["slider-wrapper-wide"]]: wide,
      })}
    >
      <div className={styles["slider-controls"]}>
        <div className={styles["slider-dots"]}>
          {dotsArr.map((el) => (
            <div
              key={el}
              onClick={() => callbacks.goToSlide(el)}
              className={styles["progress"]}
            >
              <div
                className={styles["progress-line"]}
                style={{
                  width: `${el === currSlide ? "100%" : "0%"}`,
                  transition: `width ${period / 1000}s`,
                  backgroundColor:
                    el === currSlide
                      ? "var(--Brand-Primary-1000-color)"
                      : "transparent",
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles["btns-wrapper"]}>
          <button
            className={cn(styles["slider-button"], {
              [styles["active-button"]]: activeButton === "prev",
            })}
            onClick={callbacks.prevSlide}
          >
            {activeButton === "prev" ? (
              <SliderArrowLeftColor className={styles["slider-button-img"]} />
            ) : (
              <SliderArrowLeft className={styles["slider-button-img"]} />
            )}
          </button>
          <button
            className={cn(styles["slider-button"], {
              [styles["active-button"]]: activeButton === "next",
            })}
            onClick={callbacks.nextSlide}
          >
            {activeButton === "next" ? (
              <SliderArrowRightColor className={styles["slider-button-img"]} />
            ) : (
              <SliderArrowRight className={styles["slider-button-img"]} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

type SliderLKProps = {
  children: React.ReactNode;
};

const SliderLK = forwardRef(({ children }: SliderLKProps, ref) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1.9,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: false,
    autoplaySpeed: 1200,
  };

  useImperativeHandle(ref, () => ({
    slickNext: () => {
      sliderRef.current?.slickNext();
    },
    slickPrev: () => {
      sliderRef.current?.slickPrev();
    },
    slickGoTo: (index: number) => {
      sliderRef.current?.slickGoTo(index);
    },
  }));

  return (
    <section className={styles["SliderLK-gallery-slide"]}>
      <Slider ref={sliderRef} {...settings}>
        {React.Children.map(children, (child) => (
          <div className={styles["SliderLK-gallery-slideItem"]}>{child}</div>
        ))}
      </Slider>
    </section>
  );
});

export default SliderLK;
*/