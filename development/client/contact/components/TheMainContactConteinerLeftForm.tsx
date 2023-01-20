import React, { useMemo, useRef, FormEventHandler, useState, AnimationEventHandler, useEffect } from "react";
import { useDispatch, useTypedSelector } from "../../customHooks";
import { useFormValidation, useFetch } from "../../customHooks";
import { setUserData } from "../../store/slices/userData";
import type { IContactData } from "../../../types/contact";

import TheMainContactConteinerLeftFormTextarea from "./TheMainContactConteinerLeftFormTextarea";
import Button from "../../globalComponents/Button";
import EmailMessage from "../../globalComponents/EmailMessage";
import Input from "../../globalComponents/Input";

import "../styles/TheMainContactConteinerLeftForm.scss";

export default function TheMainContactConteinerLeftForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { formData, formElements } = useFormValidation(formRef);
    const [ message, setMessage ] = useState<string | null>(null);
    const userData = useTypedSelector<"userData">(state => state.userData);

    const path = encodeURI("/contact us/user");
    const fetch = useFetch<IContactData>(path, "json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if ( userData ) {
            const form = formRef.current as HTMLFormElement;

            if ( Object.entries(userData).length >= 5 ) {

                setMessage(state => state ? state : "You already registred");

                form.classList.add("isFetched");
            }
        }
    }, [ userData ]);

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const errorFormElem = formElements.find((formElem) => formElem.isError === true);

        if ( errorFormElem ) {
            const errorY = scrollY + errorFormElem.formElem.getBoundingClientRect().y;

            scroll({
                top: errorY,
                behavior: "smooth"
            });
        } else {
            const response = await fetch();

            if ( response instanceof Object ) {
                setMessage(
                    typeof response !== "string" ? "Your email was saved" : response
                );

                dispatch(
                    setUserData(response)
                );
            }
        }
    }

    const onAnimationEnd: AnimationEventHandler<HTMLFormElement> = (event) => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageRef.current as HTMLSpanElement;
        message.classList.add("messageActive");

        setTimeout(() => message.classList.add("messageStart"));
    }

    const inputs = useMemo(() => (
        [
            {
                id: "username",
                name: "name",
                type: "text",
                placeholder: "your name",
                className: "mainContact_conteiner__left___input",
                minLength: 1,
                maxLength: 15,
                required: true
            },
            {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "your email",
                className: "mainContact_conteiner__left___input",
                minLength: 15,
                maxLength: 40,
                required: true
            },
            {
                id: "object",
                name: "object",
                type: "text",
                placeholder: "object",
                className: "mainContact_conteiner__left___input mainContact_conteiner__left___inputLarge",
                minLength: 10,
                maxLength: 100,
                required: true
            }
        ]
    ), []);

    return(
        <>
                <form
                    ref={formRef}
                    onSubmit={onSubmitForm}
                    onAnimationEnd={onAnimationEnd}
                    className="mainContact_conteiner__left___form"
                    autoComplete=""
                >
                    {
                        inputs.map(input => (
                            <Input key={input.id} {...input} />
                        ))
                    }
                    <TheMainContactConteinerLeftFormTextarea/>
                    <Button startColor="green" type="submit" className="mainContact_conteiner__left___form____button">
                        send
                    </Button>
            </form>
            <EmailMessage ref={messageRef} appendedClassName="contact">
                { message ?? "" }
            </EmailMessage>
        </>
    )
}