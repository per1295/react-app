import React from "react";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

import MainServicesFirstGroupUnderItem from "./MainServicesFirstGroupUnderItem";

import "../styles/TheMainServicesFirstGroupUnder.scss";

export default function TheMainServicesFirstGroupUnder() {
    const titles = [
        "KEEP PULSE GOING", "PASS THE LIMITS", "GREAT IDEAS", "AWESOME SUPPORT"
    ];

    const icons = [
        "analytics-outline", "infinite-outline", "flash-outline", "options-outline"
    ] as unknown as (keyof typeof IconList)[];

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