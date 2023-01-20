import React, { forwardRef } from "react";
import "../globalStyles/TheConteinerEmailInput.scss";

const TheConteinerEmailInput = forwardRef<HTMLInputElement>((_props, ref) => (
    <input
        ref={ref}
        type="email"
        name="email"
        className="conteiner_email__input"
        placeholder="your email"
        autoComplete="on"
    />
))

export default TheConteinerEmailInput;