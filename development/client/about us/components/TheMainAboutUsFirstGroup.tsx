import React from "react";
import "../styles/TheMainAboutUsFirstGroup.scss";
import MainAboutUsFirstGroupItem from "./MainAboutUsFirstGroupItem";

export default function TheMainAboutUsFirstGroup() {
    return(
        <div className="mainAboutUs_firstGroup">
            <MainAboutUsFirstGroupItem title="about us" underTitle="We are awesome"/>
            <MainAboutUsFirstGroupItem title="What We Do" underTitle="Creative & Digital"/>
        </div>
    )
}