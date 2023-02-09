import React from "react";

import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import TheMainFirstGroupBody from "./TheMainFirstGroupBody";

import "../styles/TheMainFirstGroup.scss";

export default function TheMainFirstGroup() {
    return(
        <div className="main_firstGroup">
            <TitleOfGroup appendedClassName="main_firstGroup">
                why choose us
            </TitleOfGroup>
            <TheMainFirstGroupBody/>
        </div>
    )
}