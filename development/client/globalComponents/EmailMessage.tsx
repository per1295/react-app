import React, { forwardRef } from "react";

import "../globalStyles/EmailMessage.scss";

interface EmailMessageProps {
    children: JSX.Element | string;
    appendedClassName?: string;
}

const EmailMessage = forwardRef<HTMLSpanElement, EmailMessageProps>(({ children, appendedClassName }, ref) => {
    return(
        <span className={`message${appendedClassName ? " message_" + appendedClassName : ""}`} ref={ref}>
            { children }
        </span>
    )
});

export default EmailMessage;