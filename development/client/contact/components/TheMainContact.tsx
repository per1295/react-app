import React from "react";

import TheMainContactConteiner from "./TheMainContactConteiner";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

import "../styles/TheMainContact.scss";

export default function TheMainContact() {
    return(
        <main className="mainContact">
            <TheMainContactConteiner/>
            <TheMainThirdGroup/>
        </main>
    )
}