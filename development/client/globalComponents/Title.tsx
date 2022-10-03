import React, { FunctionComponent } from "react";
import GreenBlock from "./GreenBlock";
import "../globalStyles/Title.scss";

interface TitleProps {
    appendedClassName: string;
    children: JSX.Element | string;
}

const Title: FunctionComponent<TitleProps> = ({ appendedClassName, children }) => {
    return(
        <div className={"title " + appendedClassName + "_title"}>
            <span className={"title_name " + appendedClassName + "_title_name"}>
                { children }
            </span>
            <GreenBlock className={"title_greenBlock " + appendedClassName + "_title_greenBlock"}/>
        </div>
    )
}

export default Title;