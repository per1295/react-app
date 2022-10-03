import React from "react";
import TheHeader from "../globalComponents/TheHeader";
import TheMainAboutUs from "./components/TheMainAboutUs";
import TheFooter from "../globalComponents/TheFooter";

export default function AboutUs() {
    return(
        <>
           <TheHeader title="about us" underTitle="home / about"/>
           <TheMainAboutUs/>
           <TheFooter/>
        </>
    )
}