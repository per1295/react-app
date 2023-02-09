import React, { FunctionComponent } from "react";
import { useTypedSelector } from "../customHooks";

import TheHeaderTop from "./TheHeaderTop";
import TheHeaderMain from "./TheHeaderMain";
import TheHeaderNavLinksMobile from "./TheHeaderNavLinksMobile";

import "../globalStyles/TheHeader.scss";

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