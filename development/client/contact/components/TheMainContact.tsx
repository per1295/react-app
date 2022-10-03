import React from "react";
import "../styles/TheMainContact.scss";
import TheMainContactConteiner from "./TheMainContactConteiner";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

export default function TheMainContact() {
    return(
        <main className="mainContact">
            <TheMainContactConteiner/>
            <TheMainThirdGroup/>
        </main>
    )
}