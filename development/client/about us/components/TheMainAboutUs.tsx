import React from "react";
import "../styles/TheMainAboutUs.scss";
import TheMainAboutUsFirstGroup from "./TheMainAboutUsFirstGroup";
import TheMainAboutUsSecondGroup from "./TheMainAboutUsSecondGroup";
import TheMainAboutUsThirdGroup from "./TheMainAboutUsThirdGroup";
import TheMainThirdGroup from "../../globalComponents/TheMainThirdGroup";

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