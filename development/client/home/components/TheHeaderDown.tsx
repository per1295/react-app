import React from "react";
import "../styles/TheHeaderDown.scss";
import Img from "../../globalComponents/Img";
import header_down__img from "../images/header_down__img.png";
import TheHeaderDownRight from "./TheHeaderDownRight";

export default function TheHeaderDown() {
    return(
        <div className="header_down">
            <Img src={header_down__img} alt="header_down__img" className="header_down__img"/>
            <TheHeaderDownRight/>
        </div>
    )
}