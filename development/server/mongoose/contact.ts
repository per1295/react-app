import { Schema, model } from "mongoose";
import { methodGetPOJO } from "../functions";

import type { IContactData } from "../../types/contact";
import type { ExtendedSchema } from "../../types";

const contactDataSchema: ExtendedSchema<IContactData> = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 1,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 40
    },
    object: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
        maxlength: 50
    }
}, {
    collection: "contactData",
    methods: {
        methodGetPOJO
    }
});

export const ContactData = model("contactData", contactDataSchema);