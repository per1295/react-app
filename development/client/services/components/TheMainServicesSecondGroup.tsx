import React from "react";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import "../styles/TheMainServicesSecondGroup.scss";
import TheMainServicesSecondGroupPlans from "./TheMainServicesSecondGroupPlans";

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