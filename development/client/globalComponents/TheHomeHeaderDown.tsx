import React from "react";

import Img from "./Img";
import TheHeaderDownRight from "./TheHomeHeaderDownRight";

import header_down__img from "../globalImages/header_down__img.png";

import "../globalStyles/TheHomeHeaderDown.scss";

export default function TheHeaderDown() {
    return(
        <div className="header_down">
            <Img src={header_down__img} alt="header_down__img" className="header_down__img"/>
            <TheHeaderDownRight/>
        </div>
    )
}