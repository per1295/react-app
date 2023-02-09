import React from "react";

import MainAboutUsFirstGroupItem from "./MainAboutUsFirstGroupItem";

import "../styles/TheMainAboutUsFirstGroup.scss";

export default function TheMainAboutUsFirstGroup() {
    return(
        <div className="mainAboutUs_firstGroup">
            <MainAboutUsFirstGroupItem title="about us" underTitle="We are awesome"/>
            <MainAboutUsFirstGroupItem title="What We Do" underTitle="Creative & Digital"/>
        </div>
    )
}