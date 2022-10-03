import React from "react";
import "../styles/TheMainServicesFirstGroupUnder.scss";
import MainServicesFirstGroupUnderItem from "./MainServicesFirstGroupUnderItem";

export default function TheMainServicesFirstGroupUnder() {
    const titles = [
        "KEEP PULSE GOING", "PASS THE LIMITS", "GREAT IDEAS", "AWESOME SUPPORT"
    ];

    const icons = [
        "analytics-outline", "infinite-outline", "flash-outline", "options-outline"
    ];

    return(
        <div className="mainServices_firstGroup__under">
            {
                icons.map((icon, index) => (
                    <MainServicesFirstGroupUnderItem key={index} iconName={icon} title={titles[index]}/>
                ))
            }
        </div>
    )
}