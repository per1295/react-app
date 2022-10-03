import React, { useContext, useRef, useEffect, useState, PointerEventHandler } from "react";
import "../styles/TheMainAboutUsThirdGroupBottomSlider.scss";
import BottomSliderSlide from "./BottomSliderSlide";
import { SliderContext } from "./TheWrapSlider";
import { useTypedSelector } from "../../customHooks";

interface SliderXCoords {
    startX: number;
    nowX: number;
    isEnd: boolean;
}

export default function TheMainAboutUsThirdGroupBottomSlider() {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const { nowSlide, setNowSlide } = useContext(SliderContext);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [ xCoords, setXCoords ] = useState<SliderXCoords>({ startX: 0, nowX: 0, isEnd: true });
    const [ nowTranslateXPercent, setNowTranslateXPercent ] = useState<number>(0);

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        const slider = sliderRef.current as HTMLDivElement;
        const slides = slider.children as HTMLCollectionOf<HTMLDivElement>;

        setXCoords((state) => ({
            ...state,
            startX: 0,
            nowX: 0
        }));
        setNowTranslateXPercent(-100 * nowSlide);
        Array.from(slides).forEach(slide => {
            slide.style.removeProperty("transition");
            slide.style.transform = `translateX(${-100 * nowSlide}%)`;
        });
    }, [ nowSlide ]);

    useEffect(() => {
        if ( isMobileOrTablet ) {
            const { startX, nowX, isEnd } = xCoords;
            const diffrence = startX - nowX;
            const isMoving = diffrence !== 0 && startX !== 0 && nowX !== 0; 

            if ( isMoving ) {
                const slider = sliderRef.current as HTMLDivElement;
                const sliderWidth = slider.offsetWidth;
                const slides = slider.children as HTMLCollectionOf<HTMLDivElement>;
                const percentMove = diffrence * 100 / sliderWidth;
                const movePercent = nowTranslateXPercent - percentMove;

                if ( movePercent <= 0 && movePercent >= -300  ) {
                    if ( !isEnd ) {
                        Array.from(slides).forEach(slide => {
                            slide.style.transition = "none";
                            slide.style.transform = `translateX(${movePercent}%)`;
                        });
                    } else {
                        if ( diffrence > 0 ) {
                            setNowSlide(state => state + 1);
                        } else {
                            setNowSlide(state => state - 1);
                        }
                    }
                }
            }
        }
    }, [ xCoords ]);

    const startMoveSlider: PointerEventHandler<HTMLDivElement> = (event) => {
        const startX = Math.floor(event.clientX);
        setXCoords(state => ({
            ...state,
            startX,
            isEnd: false
        }));
    }

    const moveSlider: PointerEventHandler<HTMLDivElement> = (event) => {
        const nowX = Math.floor(event.clientX);
        setXCoords(state => ({
            ...state,
            nowX
        }));
    }

    const endMoveSlider: PointerEventHandler<HTMLDivElement> = () => {
        setXCoords((state) => ({
            ...state,
            isEnd: true
        }));
    }

    return(
        <div
        onPointerDown={isMobileOrTablet ? startMoveSlider : undefined}
        onPointerMove={isMobileOrTablet ? moveSlider : undefined}
        onPointerUp={isMobileOrTablet ? endMoveSlider : undefined}
        onPointerCancel={isMobileOrTablet ? endMoveSlider : undefined}
        ref={sliderRef}
        className="mainAboutUs_thirdGroup__bottom___slider">
            {
                Array.from({ length: 4 }).map((_item, index) => (
                    <BottomSliderSlide key={index}/>
                ))
            }
        </div>
    )
}