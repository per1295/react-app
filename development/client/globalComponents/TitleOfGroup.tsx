import React, { FunctionComponent } from "react";
import Title from "./Title";
import Information from "./Information";
import "../globalStyles/TitleOfGroup.scss";

interface TitleOfGroupProps {
    appendedClassName: string;
    children: JSX.Element | string;
}

const TitleOfGroup: FunctionComponent<TitleOfGroupProps> = ({ appendedClassName, children }) => {
    return(
        <div className={"titleOfGroup " + appendedClassName + "_titleOfGroup"}>
            <Title appendedClassName={`${appendedClassName}_titleOfGroup`}>
                { children }
            </Title>
            <Information appendedClassName={`${appendedClassName}_titleOfGroup`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Information>
        </div>
    )
}

export default TitleOfGroup;