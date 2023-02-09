import React from "react";

import Img from "../../globalComponents/Img";
import Information from "../../globalComponents/Information";
import Button from "../../globalComponents/Button";

import "../styles/BottomSliderSlide.scss";

import slideImage from "../images/slideImage.png";

export default function BottomSliderSlide() {
    return(
        <div className="bottom_slider__slide">
            <Img src={slideImage} alt="slideImage" className="bottom_slider__slide___img"/>
            <Information appendedClassName="bottom_slider__slide">
                Quisque iaculis lorem vestibulum eros vehicula, non congue elit dictum. Donec mollis aliquet lorem, eu porttitor sapien semper in. Duis ac erat luctus, gravida lectus sit amet, consectetur orci. Suspendisse libero mauris.
            </Information>
            <Button startColor="green" className="bottom_slider__slide___button">
                john doe
            </Button>
        </div>
    )
}