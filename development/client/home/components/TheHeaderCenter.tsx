import React from "react";
import "../styles/TheHeaderCenter.scss";
import "../styles/TheHeaderCenterGreenBlock.scss";
import "../styles/TheHeaderCenterInformation.scss";

import GreenBlock from "../../globalComponents/GreenBlock";
import TheHeaderCenterTitle from "./TheHeaderCenterTitle";
import Information from "../../globalComponents/Information";

export default function TheHeaderCenter() {
    return(
        <div className="header_center">
            <GreenBlock className="header_center__greenBlock">
                we’re
            </GreenBlock>
            <TheHeaderCenterTitle/>
            <Information appendedClassName="header_center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Information>
        </div>
    )
}