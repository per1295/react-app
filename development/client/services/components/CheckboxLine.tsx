import React, { FunctionComponent } from "react";

import IonIcon from "@reacticons/ionicons";

import "../styles/CheckboxLine.scss";

interface CheckboxLineProps {
    children: string | JSX.Element;
}

const CheckboxLine: FunctionComponent<CheckboxLineProps> = ({ children }) => {
    return(
        <div className="checkboxLine">
            <IonIcon name="checkbox-outline" className="checkboxLine_icon"/>
            <span className="checkboxLine_title">
                { children }
            </span>
        </div>
    )
}

export default CheckboxLine;