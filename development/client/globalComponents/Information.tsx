import React, { FunctionComponent } from "react";

interface InformationProps {
    children: JSX.Element | string;
    appendedClassName: string;
}

const Information: FunctionComponent<InformationProps> = ({ children, appendedClassName }) => {
    return(
        <div className={ "information " + appendedClassName + "_information" }>
            { children }
        </div>
    )
}

export default Information;