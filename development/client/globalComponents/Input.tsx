import React, { FunctionComponent, useRef, FocusEvent } from "react";

interface InputProps {
    type: string;
    name: string;
    className: string;
    id: string;
    placeholder: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const Input: FunctionComponent<InputProps> =
({ type, name, id, placeholder, className, required, minLength, maxLength }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const changePlaceholder = (event: FocusEvent) => {
        const input = inputRef.current;

        if ( input ) {
            const type = event.type;

            switch(type){
                case "focus":
                    input.placeholder = "";
                    break;
                case "blur":
                    input.placeholder = placeholder;
                    break;
            }
        }
    }

    return(
        <input
            ref={inputRef}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className={className}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            autoComplete="on"
            onFocus={changePlaceholder}
            onBlur={changePlaceholder}
        />
    )
}

export default Input