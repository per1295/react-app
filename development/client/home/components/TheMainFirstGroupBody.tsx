import React from "react";
import "../styles/TheMainFirstGroupBody.scss";
import TheMainFirstGroupBodyLeft from "./TheMainFirstGroupBodyLeft";
import Img from "../../globalComponents/Img";
import main_firstGroup__body___rightImg from "../images/main_firstGroup__body___rightImg.png";
import "../styles/TheMainFirstGroupBodyRightImg.scss";

export default function TheMainFirstGroupBody() {
    return(
        <div className="main_firstGroup__body">
            <TheMainFirstGroupBodyLeft/>
            <Img src={main_firstGroup__body___rightImg} alt="main_firstGroup__rightImg" className="main_firstGroup__body___rightImg"/>
        </div>
    )
}