import React, { FormEventHandler, useRef, useState, AnimationEventHandler, useEffect } from "react";
import { useTypedSelector, useDispatch, useFormValidation } from "../customHooks";
import { useFetcher } from "react-router-dom";
import { checkFields } from "../../functions";
import cookie from "cookiejs";
import { setUserData } from "../store/slices/userData";
import type { IContactData } from "../../types/contact";

import TheConteinerEmailInput from "./TheConteinerEmailInput";
import Button from "./Button";
import EmailMessage from "./EmailMessage";

import "../globalStyles/TheConteinerEmail.scss";
import "../globalStyles/TheConteinerEmailSubmit.scss";

export default function TheConteinerEmail() {
    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLSpanElement>(null);
    const [ message, setMessage ] = useState<string | null>(null);
    const { formElements } = useFormValidation(formRef);
    const userData = useTypedSelector<"userData">(state => state.userData);
    const fetcher = useFetcher<string>();
    const dispatch = useDispatch();

    useEffect(() => {
        if ( userData ) {
            const formElem = formRef.current;

            if ( formElem && checkFields(userData, "id", "email") ) {
                setMessage(message => message ? message : "You already sent email");
                formElem.classList.add("isFetched");
            }
        }
    }, [ userData ]);

    useEffect(() => {
        const formElem = formRef.current;
        
        if ( formElem && fetcher.data ) {
            setMessage(fetcher.data);
            formElem.classList.add("isFetched");

            const { id, name, email, object, message } = cookie.all();
            const cookies = { id, name, email, object, message } as IContactData;
            
            if ( checkFields(cookies, "id", "email") ) {
                dispatch(
                    setUserData(cookies)
                );
            }
        }
    }, [ fetcher.data ]);

    const onSubmit: FormEventHandler = async ( event ) => {
        event.preventDefault();

        const formElem = formRef.current;
        const isError = formElements.some(formElem => formElem.isError);

        if ( formElem && !isError ) {
            fetcher.submit(formElem, {
                method: "post",
                action: "/api/email"
            });
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
            <fetcher.Form
                ref={formRef}
                className="conteiner_email"
                onSubmit={onSubmit}
                onAnimationEnd={onAnimationEnd}
            >
                <TheConteinerEmailInput />
                <Button className="conteiner_email__submit" startColor="green" type="submit">
                    send
                </Button>
            </fetcher.Form>
            <EmailMessage ref={messageRef}>
                { message ?? "" }
            </EmailMessage>
        </>
    )
}