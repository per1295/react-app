import React, { FunctionComponent } from "react";
import "../globalStyles/TheHeaderMain.scss";

interface TheHeaderMainProps {
    title: string;
    underTitle: string;
}

const TheHeaderMain: FunctionComponent<TheHeaderMainProps> = ({ title, underTitle }) => {
    return(
        <div className="headerOther_main">
            <span className="headerOther_main__title">
                { title }
            </span>
            <span className="headerOther_main__underTitle">
                { underTitle }
            </span>
        </div>
    )
}

export default TheHeaderMain;