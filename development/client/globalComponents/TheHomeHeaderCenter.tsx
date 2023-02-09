import React from "react";

import GreenBlock from "./GreenBlock";
import TheHeaderCenterTitle from "./TheHomeHeaderCenterTitle";
import Information from "./Information";

import "../globalStyles/TheHomeHeaderCenter.scss";
import "../globalStyles/TheHomeHeaderCenterGreenBlock.scss";
import "../globalStyles/TheHomeHeaderCenterInformation.scss";

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