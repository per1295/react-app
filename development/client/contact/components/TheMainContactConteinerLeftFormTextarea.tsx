import React from "react";
import "../styles/TheMainContactConteinerLeftFormTextarea.scss";

export default function TheMainContactConteinerLeftFormTextarea() {
    return(
        <textarea
            name="message"
            className="mainContact_conteiner__left___form____textarea"
            placeholder="message"
            minLength={10}
            maxLength={50}
            autoComplete="on"
        />
    )
}