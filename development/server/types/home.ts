import { Transporter } from "nodemailer";

export interface IEmailData {
    id: number;
    email: string;
    isVerified: boolean;
}

export interface IResponse {
    status: "success" | "fail";
    message: string;
}

export interface IAppLocals {
    transport: Transporter<any>;
    emailResponser: string;
    PORT: string | number;
}

export interface IOptionsCookie {
    maxAge: number;
    path: string;
}