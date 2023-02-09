import React, { createContext, Dispatch, SetStateAction, useState } from "react";

import TheMainAboutUsThirdGroupBottomSlider from "./TheMainAboutUsThirdGroupBottomSlider";
import TheMainAboutUsThirdGroupBottomSliderButtons from "./TheMainAboutUsThirdGroupBottomSliderButtons";

import "../styles/TheWrapSlider.scss";

interface NowSliderContext {
    nowSlide: number;
    setNowSlide: Dispatch<SetStateAction<number>>
}

const sliderContext = {
    nowSlide: 0,
    setNowSlide: (slide: number) => slide
} as NowSliderContext;

export const SliderContext = createContext<NowSliderContext>(sliderContext);

export default function TheWrapSlider() {
    const [ nowSlide, setNowSlide ] = useState<number>(0);

    const sliderContextValue = {
        nowSlide,
        setNowSlide
    }

    return(
        <SliderContext.Provider value={sliderContextValue}>
            <div className="wrap_slider">
                <TheMainAboutUsThirdGroupBottomSlider/>
                <TheMainAboutUsThirdGroupBottomSliderButtons/>
            </div>
        </SliderContext.Provider>
    )
}