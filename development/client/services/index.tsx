import React from "react";
import TheHeader from "../globalComponents/TheHeader";
import TheMainServices from "./components/TheMainServices";
import TheMainThirdGroup from "../globalComponents/TheMainThirdGroup";
import TheFooter from "../globalComponents/TheFooter";

export default function Services() {
    return(
        <>
            <TheHeader title="our services" underTitle="home / services"/>
            <TheMainServices/>
            <TheMainThirdGroup/>
            <TheFooter/>
        </>
    )
}