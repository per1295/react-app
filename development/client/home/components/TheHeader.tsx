import React from "react";
import "../styles/TheHeader.scss";
import TheHeaderTop from "../../globalComponents/TheHeaderTop";
import TheHeaderCenter from "./TheHeaderCenter";
import TheHeaderDown from "./TheHeaderDown";
import { useTypedSelector } from "../../customHooks";
import TheHeaderNavLinksMobile from "../../globalComponents/TheHeaderNavLinksMobile";

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