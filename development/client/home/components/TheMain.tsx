import React from "react";

import TheMainFirstGroup from "./TheMainFirstGroup";
import TheMainSecondGroup from "./TheMainSecondGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

import "../styles/TheMain.scss";

export default function TheMain() {
    return(
        <main className="mainHome">
            <TheMainFirstGroup/>
            <TheMainSecondGroup/>
            <TheMainThirdGroup/>
        </main>
    )
}