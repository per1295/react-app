import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../customHooks";

import TheHeaderTopMenu from "./TheHeaderTopMenu";
import TheHeaderTopMenuNavLinks from "./TheHeaderTopNavLinks";

import "../globalStyles/TheHeaderTop.scss";

const TheHeaderTop = () => {
    const isMobile = useTypedSelector<"isMobile">((state) => state.isMobile);

    return(
        <div className="header_top">
            <Link to="/home" className="header_top__homelink">akad.</Link>
            { isMobile ? null : <TheHeaderTopMenuNavLinks/> }
            <TheHeaderTopMenu/>
        </div>
    )
}

export default TheHeaderTop;