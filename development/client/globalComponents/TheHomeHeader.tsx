import React from "react";
import { useTypedSelector } from "../customHooks";

import TheHeaderTop from "./TheHeaderTop";
import TheHeaderCenter from "./TheHomeHeaderCenter";
import TheHeaderDown from "./TheHomeHeaderDown";
import TheHeaderNavLinksMobile from "./TheHeaderNavLinksMobile";

import "../globalStyles/TheHomeHeader.scss";

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