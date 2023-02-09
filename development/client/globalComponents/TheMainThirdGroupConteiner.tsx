import React from "react";

import TheMainThirdGroupConteinerLeft from "./TheMainThirdGroupConteinerLeft";
import TheMainThirdGroupConteinerRight from "./TheMainThirdGroupConteinerRight";

import "../globalStyles/TheMainThirdGroupConteiner.scss";

export default function TheMainThirdGroupConteiner() {
    return(
        <div className="main_thirdGroup__conteiner">
            <TheMainThirdGroupConteinerLeft />
            <TheMainThirdGroupConteinerRight />
        </div>
    )
}