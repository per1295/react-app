import { IResponse, IOptionsCookie } from "./types/home";

export class Response implements IResponse {
    status: "success" | "fail";
    message: string;

    constructor({ status = "success", message = "" }: IResponse) {
        this.status = status;
        this.message = message;
    }
}

export class OptionsCookie implements IOptionsCookie {
    maxAge: number;
    path: string;

    constructor({ maxAge = 3.6e6, path = "/" }) {
        this.maxAge = maxAge;
        this.path = path;
    }
}