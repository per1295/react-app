import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainSecondGroupCategory from "./TheMainSecondGroupCaterory";

import "../styles/TheMainSecondGroup.scss";

export default function TheMainSecondGroup() {
    return(
        <div className="main_secondGroup">
            <TitleOfGroup appendedClassName="main_secondGroup">
                our portfolio
            </TitleOfGroup>
            <TheMainSecondGroupCategory/>
        </div>
    )
}