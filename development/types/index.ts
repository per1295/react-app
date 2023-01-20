import type { Schema, Types, LeanDocument } from "mongoose";

export type Mode = "development" | "production" | "test";

export interface Args {
    [key: string]: string;
}

export interface IEmailData {
    id: number;
    email: string;
}

interface SchemaMethods {
    methodGetPOJO: () => { [k: string]: any }
}

export type ExtendedSchema<SchemaType extends { id: number }> = Schema<Omit<SchemaType, "id">, {}, SchemaMethods>;