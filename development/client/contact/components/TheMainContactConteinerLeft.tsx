import React from "react";
import "../styles/TheMainContactConteinerLeft.scss";
import TheMainContactConteinerLeftForm from "./TheMainContactConteinerLeftForm";
import TheMainContactConteinerLeftInfo from "./TheMainContactConteinerLeftInfo";

export default function TheMainContactConteinerLeft() {
    return(
        <div className="mainContact_conteiner__left">
            <TheMainContactConteinerLeftForm/>
            <TheMainContactConteinerLeftInfo/>
        </div>
    )
}