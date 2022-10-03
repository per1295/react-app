import React from "react";
import "../styles/TheMainAboutUsThirdGroupBottom.scss";
import TheWrapSlider from "./TheWrapSlider";
import TheMainAboutUsThirdGroupBottomImages from "./TheMainAboutUsThirdGroupBottomImages";

export default function TheMainAboutUsThirdGroupBottom() {
    return(
        <div className="mainAboutUs_thirdGroup__bottom">
            <TheWrapSlider/>
            <TheMainAboutUsThirdGroupBottomImages/>
        </div>
    )
}