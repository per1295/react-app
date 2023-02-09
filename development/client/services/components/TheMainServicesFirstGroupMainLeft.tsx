import React from "react";

import Information from "../../globalComponents/Information";
import MainServicesFirstGroupMainLeftCheckboxes from "./MainServicesFirstGroupMainLeftCheckboxes";

import "../styles/TheMainServicesFirstGroupMainLeft.scss";

export default function TheMainServicesFirstGroupMainLeft() {
    const firstTitles = [
        "Stunning on all screens",
        "Easy to customize",
        "Make a difference",
        "Imagine and create",
        "Unlimited possibilities"
    ];

    const secondTitles = [
        "Remarkable style",
        "Captivating presentations",
        "Make your portfolio pop",
        "Words that matter",
        "Satisfied clients"
    ];

    return(
        <div className="mainServices_firstGroup__main___left">
            <Information appendedClassName="mainServices_firstGroup__main___left">
                Erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.
            </Information>
            <div className="wrapCheckboxes">
                <MainServicesFirstGroupMainLeftCheckboxes titles={firstTitles}/>
                <MainServicesFirstGroupMainLeftCheckboxes titles={secondTitles}/>
            </div>
        </div>
    )
}