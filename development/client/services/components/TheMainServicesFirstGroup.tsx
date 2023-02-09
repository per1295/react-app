import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainServicesFirstGroupMain from "./TheMainServicesFirstGroupMain";
import TheMainServicesFirstGroupUnder from "./TheMainServicesFirstGroupUnder";

import "../styles/TheMainServicesFirstGroup.scss";

export default function TheMainServicesFirstGroup() {
    return(
        <div className="mainServices_firstGroup">
            <TitleOfGroup appendedClassName="mainServices_firstGroup">
                What we do
            </TitleOfGroup>
            <TheMainServicesFirstGroupMain/>
            <TheMainServicesFirstGroupUnder/>
        </div>
    )
}