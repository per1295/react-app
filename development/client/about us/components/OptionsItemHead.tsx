import React, { FunctionComponent } from "react";
import IonIcon from "@reacticons/ionicons";
import "../styles/OptionsItemHead.scss";

interface OptionsItemHeadProps {
    iconName: string;
    title: string;
}

const OptionsItemHead: FunctionComponent<OptionsItemHeadProps> = ({ iconName, title }) => {
    return(
        <div className="options_item__head">
            <div className="options_item__head___icon">
                <IonIcon name={iconName} className="options_item__head___icon____content"/>
            </div>
            <span className="options_item__head___title">
                { title }
            </span>
        </div>
    )
}

export default OptionsItemHead;