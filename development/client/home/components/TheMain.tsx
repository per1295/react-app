import React from "react";
import "../styles/TheMain.scss";
import TheMainFirstGroup from "./TheMainFirstGroup";
import TheMainSecondGroup from "./TheMainSecondGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

export default function TheMain() {
    return(
        <main className="mainHome">
            <TheMainFirstGroup/>
            <TheMainSecondGroup/>
            <TheMainThirdGroup/>
        </main>
    )
}