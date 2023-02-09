import React from "react";
import { useNavigate } from "react-router-dom";

import TheMainAboutUsThirdGroupUnderTeamText from "./TheMainAboutUsThirdGroupUnderTeamText";
import Button from "../../globalComponents/Button";

import "../styles/TheMainAboutUsThirdGroupUnderTeam.scss";

export default function TheMainAboutUsThirdGroupUnderTeam() {
    const navigate = useNavigate();

    const toPortfolio = () => navigate("/portfolio");

    return(
        <div className="mainAboutUs_thirdGroup__underTeam">
            <TheMainAboutUsThirdGroupUnderTeamText/>
            <Button onClick={toPortfolio} startColor="green" className="mainAboutUs_thirdGroup__underTeam___button">
                read more
            </Button>
        </div>
    )
}