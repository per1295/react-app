import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { SliderContext } from "./TheWrapSlider";

import "../styles/BottomSliderButtonsButton.scss";

interface BottomSliderButtonsButtonProps {
    activeSlide: number;
}

const BottomSliderButtonsButton: FunctionComponent<BottomSliderButtonsButtonProps> = ({ activeSlide }) => {
    const { nowSlide, setNowSlide } = useContext(SliderContext);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = buttonRef.current as HTMLDivElement;
        if ( nowSlide === activeSlide ) button.classList.add("bottom_slideButtons__buttonAcvive");
        else button.classList.remove("bottom_slideButtons__buttonAcvive");
    }, [ nowSlide ]);

    return(
        <div
        ref={buttonRef}
        className={
            activeSlide === 0
            ?
            "bottom_slideButtons__button bottom_slideButtons__buttonAcvive"
            :
            "bottom_slideButtons__button"
        }
        onClick={() => setNowSlide(activeSlide)}>
        </div>
    )
}

export default BottomSliderButtonsButton;