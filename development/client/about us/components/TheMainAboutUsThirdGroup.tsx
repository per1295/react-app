import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainAboutUsThirdGroupTeam from "./TheMainAboutUsThirdGroupTeam";
import TheMainAboutUsThirdGroupUnderTeam from "./TheMainAboutUsThirdGroupUnderTeam";
import TheMainAboutUsThirdGroupBottom from "./TheMainAboutUsThirdGroupBottom";

import "../styles/TheMainAboutUsThirdGroup.scss";

export default function TheMainAboutUsThirdGroup() {
    return(
        <div className="mainAboutUs_thirdGroup">
            <TitleOfGroup appendedClassName="mainAboutUs_thirdGroup">
                THE DREAM TEAM
            </TitleOfGroup>
            <TheMainAboutUsThirdGroupTeam/>
            <TheMainAboutUsThirdGroupUnderTeam/>
            <TheMainAboutUsThirdGroupBottom/>
        </div>
    )
}