import React from "react";

import TheWrapSlider from "./TheWrapSlider";
import TheMainAboutUsThirdGroupBottomImages from "./TheMainAboutUsThirdGroupBottomImages";

import "../styles/TheMainAboutUsThirdGroupBottom.scss";

export default function TheMainAboutUsThirdGroupBottom() {
    return(
        <div className="mainAboutUs_thirdGroup__bottom">
            <TheWrapSlider/>
            <TheMainAboutUsThirdGroupBottomImages/>
        </div>
    )
}