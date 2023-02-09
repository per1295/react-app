import React from "react";

import TheMainContactConteinerLeftForm from "./TheMainContactConteinerLeftForm";
import TheMainContactConteinerLeftInfo from "./TheMainContactConteinerLeftInfo";

import "../styles/TheMainContactConteinerLeft.scss";

export default function TheMainContactConteinerLeft() {
    return(
        <div className="mainContact_conteiner__left">
            <TheMainContactConteinerLeftForm/>
            <TheMainContactConteinerLeftInfo/>
        </div>
    )
}