import React, { useMemo, useRef, FormEventHandler, useState, AnimationEventHandler, useEffect } from "react";
import { useDispatch, useTypedSelector, useFormValidation } from "../../customHooks";
import { setUserData } from "../../store/slices/userData";
import type { IContactData } from "../../../types/contact";
import { checkFields } from "../../../functions";
import { useFetcher } from "react-router-dom";

import TheMainContactConteinerLeftFormTextarea from "./TheMainContactConteinerLeftFormTextarea";
import Button from "../../globalComponents/Button";
import EmailMessage from "../../globalComponents/EmailMessage";
import Input from "../../globalComponents/Input";

import "../styles/TheMainContactConteinerLeftForm.scss";

export default function TheMainContactConteinerLeftForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { formElements } = useFormValidation(formRef);
    const [ message, setMessage ] = useState<string | null>(null);
    const userData = useTypedSelector<"userData">(state => state.userData);
    const dispatch = useDispatch();
    const fetcher = useFetcher<IContactData | string>();

    useEffect(() => {
        const formElem = formRef.current;

        if ( formElem ) {
            const formElemChildren = Array.from(formElem.children) as (HTMLInputElement | HTMLTextAreaElement)[];
            formElemChildren.forEach(formElem => {
                const userDataValue = localStorage.getItem(formElem.name);
                formElem.value = userDataValue ?? formElem.value;
            });
        }
    }, []);

    useEffect(() => {
        if ( fetcher.data ) {
            setMessage(
                fetcher.data instanceof Object ? "Your email was saved" : fetcher.data
            );

            if ( fetcher.data instanceof Object ) {
                dispatch(
                    setUserData(fetcher.data)
                );
            }
        }
    }, [ fetcher.data ]);

    useEffect(() => {
        if ( userData ) {
            const formElem = formRef.current;

            if ( formElem && checkFields(userData, "id", "name", "email", "object", "message") ) {
                setMessage(state => state ? state : "You already registred");
                formElem.classList.add("isFetched");
            }
        }
    }, [ userData ]);

    const onSubmitForm: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();

        const formElem = formRef.current;
        const errorFormElem = formElements.find((formElem) => formElem.isError === true);

        if ( errorFormElem ) {
            const errorY = scrollY + errorFormElem.formElem.getBoundingClientRect().y;

            scroll({
                top: errorY,
                behavior: "smooth"
            });
        } else if ( formElem ) {
            fetcher.submit(formElem, {
                method: "post",
                action: "/api/contact us/user"
            });
        }
    }

    const onAnimationEnd: AnimationEventHandler<HTMLFormElement> = event => {
        const form = event.currentTarget as HTMLFormElement;
        form.remove();
        
        const message = messageRef.current as HTMLSpanElement;
        message.classList.add("messageActive");

        setTimeout(() => message.classList.add("messageStart"));
    }

    const onInput: FormEventHandler = event => {
        const formElem = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = formElem;
        localStorage.setItem(name, value);
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
                <fetcher.Form
                    ref={formRef}
                    onSubmit={onSubmitForm}
                    onAnimationEnd={onAnimationEnd}
                    className="mainContact_conteiner__left___form"
                    autoComplete=""
                >
                    {
                        inputs.map(input => (
                            <Input key={input.id} onInput={onInput} {...input} />
                        ))
                    }
                    <TheMainContactConteinerLeftFormTextarea onInput={onInput} />
                    <Button startColor="green" type="submit" className="mainContact_conteiner__left___form____button">
                        send
                    </Button>
            </fetcher.Form>
            <EmailMessage ref={messageRef} appendedClassName="contact">
                { message ?? "" }
            </EmailMessage>
        </>
    )
}