import React from "react";
import TitleOfGroup from "../../globalComponents/TitleOfGroup";
import "../styles/TheMainFirstGroup.scss";
import TheMainFirstGroupBody from "./TheMainFirstGroupBody";

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