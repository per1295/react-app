import React from "react";

import TheConteinerTitle from "./TheConteinerTitle";
import TheConteinerDescription from "./TheConteinerDescription";
import TheConteinerEmail from "./TheConteinerEmail";

import "../globalStyles/TheMainThirdGroupConteinerRightConteiner.scss";

export default function TheMainThirdGroupConteinerRightConteiner() {
    return(
        <div className="main_thirdGroup__conteiner___right____conteiner">
            <TheConteinerTitle />
            <TheConteinerDescription />
            <TheConteinerEmail />
        </div>
    )
}