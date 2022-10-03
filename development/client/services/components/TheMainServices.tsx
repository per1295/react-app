import React from "react";
import TheMainServicesFirstGroup from "./TheMainServicesFirstGroup";
import "../styles/TheMainServices.scss";
import TheMainServicesSecondGroup from "./TheMainServicesSecondGroup";

export default function TheMainServices() {
    return(
        <main className="mainServices">
            <TheMainServicesFirstGroup/>
            <TheMainServicesSecondGroup/>
        </main>
    )
}