import React from "react";
import { useNavigate } from "react-router-dom";

import Title from "./Title";
import Information from "./Information";
import Button from "./Button";

import "../globalStyles/TheHomeHeaderDownRight.scss";
import "../globalStyles/TheHomeHeaderDownRightTitle.scss";
import "../globalStyles/TheHomeHeaderDownRightInformation.scss";
import "../globalStyles/TheHomeHeaderDownRightButton.scss";


export default function TheHeaderDownRight() {
    const navigate = useNavigate();

    const toAboutUs = () => navigate("/about us");

    return(
        <div className="header_down__right">
            <Title appendedClassName="header_down__right">
                HISTORY OF AGENCY
            </Title>
            <Information appendedClassName="header_down">
                Porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi modi tempora incidunt ut labore.
            </Information>
            <Button onClick={toAboutUs} startColor="green" className="header_down__button">
                read more
            </Button>
        </div>
    )
}