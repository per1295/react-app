import React from "react";
import "../globalStyles/TheHomeHeader.scss";
import TheHeaderTop from "./TheHeaderTop";
import TheHeaderCenter from "./TheHomeHeaderCenter";
import TheHeaderDown from "./TheHomeHeaderDown";
import { useTypedSelector } from "../customHooks";
import TheHeaderNavLinksMobile from "./TheHeaderNavLinksMobile";

export default function Header() {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);

    return(
        <header className="headerHome">
            <TheHeaderTop/>
            { isMobile ? <TheHeaderNavLinksMobile/> : null }
            <TheHeaderCenter/>
            <TheHeaderDown/>
        </header>
    )
}