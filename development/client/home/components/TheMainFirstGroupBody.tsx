import React from "react";

import TheMainFirstGroupBodyLeft from "./TheMainFirstGroupBodyLeft";
import Img from "../../globalComponents/Img";

import "../styles/TheMainFirstGroupBody.scss";
import "../styles/TheMainFirstGroupBodyRightImg.scss";

import main_firstGroup__body___rightImg from "../images/main_firstGroup__body___rightImg.png";

export default function TheMainFirstGroupBody() {
    return(
        <div className="main_firstGroup__body">
            <TheMainFirstGroupBodyLeft/>
            <Img src={main_firstGroup__body___rightImg} alt="main_firstGroup__rightImg" className="main_firstGroup__body___rightImg"/>
        </div>
    )
}