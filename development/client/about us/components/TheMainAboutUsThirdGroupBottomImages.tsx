import React, { useMemo } from "react";
import "../styles/TheMainAboutUsThirdGroupBottomImages.scss";
import BottomImagesImage from "./BottomImagesImage";

import bottomImage_1 from "../images/bottomImage_1.png";
import bottomImage_2 from "../images/bottomImage_2.png";
import bottomImage_3 from "../images/bottomImage_3.png";
import bottomImage_4 from "../images/bottomImage_4.png";
import bottomImage_5 from "../images/bottomImage_5.png";
import bottomImage_6 from "../images/bottomImage_6.png";

export default function TheMainAboutUsThirdGroupBottomImages() {
    const bottomImages = useMemo(() => [
        bottomImage_1,
        bottomImage_2,
        bottomImage_3,
        bottomImage_4,
        bottomImage_5,
        bottomImage_6
    ], []);

    return(
        <div className="mainAboutUs_thirdGroup__bottom___images">
            {
                bottomImages.map((item, index) => (
                    <BottomImagesImage key={index} img={item} alt={`bottomImage_${index}`}/>
                ))
            }
        </div>
    )
}