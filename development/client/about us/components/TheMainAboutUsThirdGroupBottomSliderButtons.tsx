import React from "react";
import "../styles/TheMainAboutUsThirdGroupBottomSliderButtons.scss";
import BottomSliderButtonsButton from "./BottomSliderButtonsButton";

export default function TheMainAboutUsThirdGroupBottomSliderButtons() {
    return(
        <div className="mainAboutUs_thirdGroup__bottom___sliderButtons">
            {
                Array.from({ length: 4 }).map((_item, index) => (
                    <BottomSliderButtonsButton key={index} activeSlide={index}/>
                ))
            }
        </div>
    )
}