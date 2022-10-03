import React from "react";
import "../styles/TheMainAboutUsSecondGroup.scss";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainAboutUsSecondGroupOptions from "./TheMainAboutUsSecondGroupOptions";

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