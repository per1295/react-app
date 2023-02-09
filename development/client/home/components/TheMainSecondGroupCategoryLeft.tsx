import React from "react";

import TheMainSecondGroupCategoryLeftOptions from "./TheMainSecondGroupCategoryLeftOptions";

import "../styles/TheMainSecondGroupCategoryLeft.scss";

export default function TheMainSecondGroupCategoryLeft() {
    return(
        <div className="main_secondGroup__category___left">
            <span className="main_secondGroup__category___left____title">
                choose category
            </span>
            <TheMainSecondGroupCategoryLeftOptions/>
        </div>
    )
}