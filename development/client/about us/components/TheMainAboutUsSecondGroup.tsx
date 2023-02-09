import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainAboutUsSecondGroupOptions from "./TheMainAboutUsSecondGroupOptions";

import "../styles/TheMainAboutUsSecondGroup.scss";

export default function TheMainAboutUsSecondGroup() {
    return(
        <div className="mainAboutUs_secondGroup">
            <TitleOfGroup appendedClassName="mainAboutUs_secondGroup">
                some benefits
            </TitleOfGroup>
            <TheMainAboutUsSecondGroupOptions/>
        </div>
    )
}