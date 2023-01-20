import React, { FormEventHandler, useRef, useState, AnimationEventHandler, useEffect } from "react";
import { useInputValidation, useFetch } from "../customHooks";
import { useTypedSelector } from "../customHooks";

import TheConteinerEmailInput from "./TheConteinerEmailInput";
import Button from "./Button";
import EmailMessage from "./EmailMessage";

import "../globalStyles/TheConteinerEmail.scss";
import "../globalStyles/TheConteinerEmailSubmit.scss";

export default function TheConteinerEmail() {
    const emailElem = useRef<HTMLInputElement>(null);
    const formElem = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLSpanElement>(null);

    const [ message, setMessage ] = useState<string | null>(null);
    const { value, error } = useInputValidation(emailElem);
    const fetch = useFetch<string>("/email", "text", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": value })
    });
    const userData = useTypedSelector<"userData">(state => state.userData);

    useEffect(() => {
        const form = formElem.current as HTMLFormElement;

        if ( userData ) {
            if ( Object.entries(userData).length >= 2) {

                setMessage("You already sent email");
                
                form.classList.add("isFetched");
            }
        }
    }, [ userData ]);

    const onSubmit: FormEventHandler = async ( event ) => {
        event.preventDefault();

        const form = formElem.current as HTMLFormElement;

        if ( !error && !userData) {
            const response = await fetch();
            
            setMessage(response);
            
            form.classList.add("isFetched");
        };
    };

    const onAnimationEnd: AnimationEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageRef.current as HTMLSpanElement;
        message.classList.add("messageActive");

        setTimeout(() => message.classList.add("messageStart"));
    }

    return(
        <>
            <form
                ref={formElem}
                className="conteiner_email"
                onSubmit={onSubmit}
                onAnimationEnd={onAnimationEnd}
            >
                <TheConteinerEmailInput ref={emailElem}/>
                <Button className="conteiner_email__submit" startColor="green" type="submit">
                    send
                </Button>
            </form>
            <EmailMessage ref={messageRef}>
                { message ?? "" }
            </EmailMessage>
        </>
    )
}