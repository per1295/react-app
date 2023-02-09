import React, { FunctionComponent } from "react";

import "../styles/MainAboutUsFirstGroupItemUnderTitle.scss"

interface MainAboutUsFirstGroupItemUnderTitleProps {
    children: string | JSX.Element;
}

const MainAboutUsFirstGroupItemUnderTitle: FunctionComponent<MainAboutUsFirstGroupItemUnderTitleProps> = ({ children }) => {
    return(
        <span className="mainAboutUs_firstGroup__item___underTitle">
            { children }
        </span>
    )
}

export default MainAboutUsFirstGroupItemUnderTitle;