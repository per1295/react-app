import React, { FunctionComponent } from "react";
import TheHeaderTop from "./TheHeaderTop";
import "../globalStyles/TheHeader.scss";
import TheHeaderMain from "./TheHeaderMain";
import { useTypedSelector } from "../customHooks";
import TheHeaderNavLinksMobile from "./TheHeaderNavLinksMobile";

interface TheHeaderProps {
    title: string;
    underTitle: string;
}

const TheHeader: FunctionComponent<TheHeaderProps> = ({ title, underTitle }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);

    return(
        <header className="headerOther">
            <TheHeaderTop/>
            { isMobile ? <TheHeaderNavLinksMobile/> : null }
            <TheHeaderMain title={title} underTitle={underTitle}/>
        </header>
    )
}

export default TheHeader;