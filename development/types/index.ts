import type { Schema } from "mongoose";
import type { IContactData } from "./contact";

export type Mode = "development" | "production" | "test";

export interface Args {
    NODE_ENV: Mode;
}

export interface IEmailData {
    id: string;
    email: string;
}

interface SchemaMethods {
    methodGetPOJO: () => { [k: string]: any }
}

export type ExtendedSchema<SchemaType extends { id: string }> = Schema<Omit<SchemaType, "id">, {}, SchemaMethods>;

export type GetUserCookies = IContactData | IEmailData;

export interface Defered {
    response: Promise<Response>;
}