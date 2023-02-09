import React, { useEffect, useRef, FormEventHandler } from "react";

import "../globalStyles/TheConteinerEmailInput.scss";

export default function TheConteinerEmailInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const inputElem = inputRef.current;

        if ( inputElem ) {
            inputElem.value = localStorage.getItem("email") ?? inputElem.value;
        }
    }, []);

    const onInput: FormEventHandler<HTMLInputElement> = event => {
        localStorage.setItem("email", event.currentTarget.value);
    }

    return(
        <input
            ref={inputRef}
            type="email"
            name="email"
            className="conteiner_email__input"
            placeholder="your email"
            autoComplete="on"
            onInput={onInput}
        />
    )
}