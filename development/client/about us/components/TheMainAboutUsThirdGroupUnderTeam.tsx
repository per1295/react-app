import React from "react";
import "../styles/TheMainAboutUsThirdGroupUnderTeam.scss";
import TheMainAboutUsThirdGroupUnderTeamText from "./TheMainAboutUsThirdGroupUnderTeamText";
import Button from "../../globalComponents/Button";
import { useNavigate } from "react-router-dom";

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