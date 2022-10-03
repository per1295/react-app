import React from "react";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import "../styles/TheMainServicesFirstGroup.scss";
import TheMainServicesFirstGroupMain from "./TheMainServicesFirstGroupMain";
import TheMainServicesFirstGroupUnder from "./TheMainServicesFirstGroupUnder";

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