import { Schema, model } from "mongoose";
import type { IEmailData } from "../../types";

const emailSchema = new Schema<Omit<IEmailData, "id">>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 15,
        maxlength: 40
    }
}, {
    collection: "emails"
});

export const Email = model("email", emailSchema);