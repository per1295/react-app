import React from "react";

import TheMainAboutUsFirstGroup from "./TheMainAboutUsFirstGroup";
import TheMainAboutUsSecondGroup from "./TheMainAboutUsSecondGroup";
import TheMainAboutUsThirdGroup from "./TheMainAboutUsThirdGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

import "../styles/TheMainAboutUs.scss";

export default function TheMainAboutUs() {
    return(
        <main className="mainAboutUs">
            <TheMainAboutUsFirstGroup/>
            <TheMainAboutUsSecondGroup/>
            <TheMainAboutUsThirdGroup/>
            <TheMainThirdGroup/>
        </main>
    )
}