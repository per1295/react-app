import { Schema, model } from "mongoose";
import { IContactData } from "../types/contact";

const contactDataSchema = new Schema<IContactData>({
    id: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    object: {
        type: String,
        required: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    collection: "contactData"
});

export const ContactData = model("contactData", contactDataSchema);