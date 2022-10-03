import React, { FormEventHandler, useRef, useState, TransitionEventHandler } from "react";
import "../globalStyles/TheConteinerEmail.scss";
import "../globalStyles/TheConteinerEmailSubmit.scss";
import TheConteinerEmailInput from "./TheConteinerEmailInput";
import Button from "./Button";
import { useInputValidation, useFetch } from "../customHooks";
import { Response } from "../../server/constructors";
import { getBaseURL } from "../functions";
import EmailMessage from "./EmailMessage";

export default function TheConteinerEmail() {
    const emailElem = useRef<HTMLInputElement>(null);
    const formElem = useRef<HTMLFormElement>(null);
    const messageElem = useRef<HTMLSpanElement>(null);

    const [ message, setMessage ] = useState<string | null>(null);
    const { value, error } = useInputValidation(emailElem);
    const fetch = useFetch<Response>(`${getBaseURL()}/home/email`, "json", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": value })
    });

    const onSubmit: FormEventHandler = async ( event ) => {
        event.preventDefault();

        const form = formElem.current as HTMLFormElement;

        if ( !error ) {
            const response = await fetch();
            if ( response ) {
                const { message } = response;
                setMessage(message);
                form.classList.add("isFetched");
            }
        };
    };

    const onTransitionend: TransitionEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageElem.current as HTMLSpanElement;
        message.classList.add("messageActive");
        setTimeout(() => {
            message.classList.add("messageStart");
        }, 0);
    }

    return(
        <>
            <form ref={formElem} action="post" className="conteiner_email" onSubmit={onSubmit} onTransitionEnd={onTransitionend}>
                <TheConteinerEmailInput ref={emailElem}/>
                <Button className="conteiner_email__submit" startColor="green" type="submit">
                    send
                </Button>
            </form>
            <EmailMessage ref={messageElem}>
                { message ?? "" }
            </EmailMessage>
        </>
    )
}