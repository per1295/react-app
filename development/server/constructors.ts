import { IResponse } from "./types/home";

export class Response implements IResponse {
    status: "success" | "fail";
    message: any;

    constructor({ status = "success", message }: IResponse) {
        this.status = status;
        this.message = message;
    }
}