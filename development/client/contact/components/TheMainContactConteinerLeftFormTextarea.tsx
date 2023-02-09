import React, { FunctionComponent, FormEventHandler } from "react";

import "../styles/TheMainContactConteinerLeftFormTextarea.scss";

interface TheMainContactConteinerLeftFormTextareaProps {
    onInput?: FormEventHandler
}

const TheMainContactConteinerLeftFormTextarea: FunctionComponent<TheMainContactConteinerLeftFormTextareaProps> =
({ onInput }) =>
{
    return(
        <textarea
            name="message"
            className="mainContact_conteiner__left___form____textarea"
            placeholder="message"
            minLength={10}
            maxLength={50}
            autoComplete="on"
            onInput={onInput}
        />
    )
}

export default TheMainContactConteinerLeftFormTextarea;