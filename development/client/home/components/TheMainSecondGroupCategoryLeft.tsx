import React from "react";
import "../styles/TheMainSecondGroupCategoryLeft.scss";
import TheMainSecondGroupCategoryLeftOptions from "./TheMainSecondGroupCategoryLeftOptions";

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