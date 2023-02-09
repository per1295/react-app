import { Schema, model } from "mongoose";
import { methodGetPOJO } from "../functions";
import type { IEmailData, ExtendedSchema } from "../../types";

const emailSchema: ExtendedSchema<IEmailData> = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 15,
        maxlength: 40
    }
}, {
    collection: "emails",
    methods: {
        methodGetPOJO
    }
});

export const Email = model("email", emailSchema);