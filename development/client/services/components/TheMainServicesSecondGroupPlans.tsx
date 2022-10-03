import React from "react";
import "../styles/TheMainServicesSecondGroupPlans.scss";
import MainServicesSecondGroupPlansPlan from "./MainServicesSecondGroupPlansPlan";

export default function TheMainServicesSecondGroupPlans() {
    const planTitles = [
        "BASIC", "ADVANCED", "smart"
    ];

    const planPrices = [
        "$35.99 Monthly", "$55.99 Monthly", "$75.99 Monthly"
    ];

    return(
        <div className="mainServices_secondGroup__plans">
            {
                planTitles.map((item, index) => (
                    <MainServicesSecondGroupPlansPlan key={index} title={item} price={planPrices[index]}/>
                ))
            }
        </div>
    )
}