import React from "react";

import TheMainServicesFirstGroup from "./TheMainServicesFirstGroup";
import TheMainServicesSecondGroup from "./TheMainServicesSecondGroup";

import "../styles/TheMainServices.scss";

export default function TheMainServices() {
    return(
        <main className="mainServices">
            <TheMainServicesFirstGroup/>
            <TheMainServicesSecondGroup/>
        </main>
    )
}