import React from "react";
import "../styles/TheMainServicesFirstGroupMain.scss";
import TheMainServicesFirstGroupMainLeft from "./TheMainServicesFirstGroupMainLeft";
import Img from "../../globalComponents/Img";

import mainServices_image from "../images/mainServices_image.png";

export default function TheMainServicesFirstGroupMain() {
    return(
        <div className="mainServices_firstGroup__main">
            <TheMainServicesFirstGroupMainLeft/>
            <Img src={mainServices_image} alt="mainServices_image" className="mainServices_firstGroup__image"/>
        </div>
    )
}