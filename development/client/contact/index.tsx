import React from "react";
import TheHeader from "../globalComponents/TheHeader";
import TheMainContact from "./components/TheMainContact";
import TheFooter from "../globalComponents/TheFooter";

export default function Contact() {
    return(
        <>
            <TheHeader title="contact us" underTitle="home / contact"/>
            <TheMainContact/>
            <TheFooter/>
        </>
    )
}