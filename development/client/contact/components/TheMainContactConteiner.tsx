import React from "react";
import "../styles/TheMainContactConteiner.scss";
import TheMainContactConteinerLeft from "./TheMainContactConteinerLeft";
import Img from "../../globalComponents/Img";

import mainContact_map from "../images/mainContact_map.png";

export default function TheMainContactConteiner() {
    return(
        <div className="mainContact_conteiner">
            <TheMainContactConteinerLeft/>
            <Img src={mainContact_map} alt="mainContact_map" className="mainContact_conteiner__img"/>
        </div>
    )
}