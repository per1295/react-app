import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainServicesSecondGroupPlans from "./TheMainServicesSecondGroupPlans";

import "../styles/TheMainServicesSecondGroup.scss";

export default function TheMainServicesSecondGroup() {
    return(
        <div className="mainServices_secondGroup">
            <TitleOfGroup appendedClassName="mainServices_secondGroup">
                pricing plans
            </TitleOfGroup>
            <TheMainServicesSecondGroupPlans/>
        </div>
    )
}