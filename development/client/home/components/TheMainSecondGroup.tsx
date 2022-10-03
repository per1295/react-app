import React from "react";
import "../styles/TheMainSecondGroup.scss";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainSecondGroupCategory from "./TheMainSecondGroupCaterory";

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