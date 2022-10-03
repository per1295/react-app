import React from "react";
import "../styles/TheMainSecondGroupCategory.scss";
import TheMainSecondGroupCategoryLeft from "./TheMainSecondGroupCategoryLeft";
import TheMainSecondGroupCategoryRight from "./TheMainSecondGroupCategoryRight";

export default function TheMainSecondGroupCategory() {
    return(
        <div className="main_secondGroup__category">
            <TheMainSecondGroupCategoryLeft/>
            <TheMainSecondGroupCategoryRight/>
        </div>
    )
}