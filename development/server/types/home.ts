import { Transporter } from "nodemailer";

export interface IEmailData {
    id: number;
    email: string;
    isVerified: boolean;
}

export interface IResponse {
    status: "success" | "fail";
    message: any;
}

interface ICookieOptions {
    expires: Date;
}

export interface IAppLocals {
    transport: Transporter<any>;
    emailResponser: string;
    PORT: string | number;
    cookieOptions: ICookieOptions;
}