import React from "react";
import "../globalStyles/TheMainThirdGroupConteiner.scss";
import TheMainThirdGroupConteinerLeft from "./TheMainThirdGroupConteinerLeft";
import TheMainThirdGroupConteinerRight from "./TheMainThirdGroupConteinerRight";

export default function TheMainThirdGroupConteiner() {
    return(
        <div className="main_thirdGroup__conteiner">
            <TheMainThirdGroupConteinerLeft/>
            <TheMainThirdGroupConteinerRight/>
        </div>
    )
}