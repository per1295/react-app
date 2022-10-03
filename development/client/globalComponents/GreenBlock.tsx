import React, { FunctionComponent } from "react";

interface BreenBlockProps {
    children?: JSX.Element | string;
    className: string;
}

const GreenBlock: FunctionComponent<BreenBlockProps> = ({ children, className }) => {
    return(
        <div className={className}>
            { children }
        </div>
    )
}

export default GreenBlock;