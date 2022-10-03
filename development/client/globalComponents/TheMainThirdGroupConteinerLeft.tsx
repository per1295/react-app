import React from "react";
import "../globalStyles/TheMainThirdGroupConteinerLeft.scss"
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TheMainThirdGroupConteinerLeft() {
    const navigate = useNavigate();

    const toContactUs = () => navigate("/contact us");

    return(
        <div className="main_thirdGroup__conteiner___left">
            <span className="main_thirdGroup__conteiner___left____title">
                YOU THINK WE'RE COOL ? LET'S WORK TOGETHER
            </span>
            <Button onClick={toContactUs} startColor="white" className="main_thirdGroup__conteiner___left____button">
                get in touch
            </Button>
        </div>
    )
}