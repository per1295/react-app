import { Router, json } from "express";
import { IContactData } from "../../types/contact";
import { ContactData } from "../mongoose/contact";
import { setCookies, wrappedHandlers } from "../functions";

const jsonParser = json();
const contact = Router();

contact.post("/user", jsonParser, ...wrappedHandlers(
    async (req, res) => {
        const { name, email, object, message } = req.body as IContactData;
        let existUser = await ContactData.findOne({ email });

        if ( existUser ) {
            return res.send("This email already use");
        }

        const newUser = new ContactData({ name, email, object, message });
        const user = await newUser.save();

        setCookies(res, user.methodGetPOJO());

        res.json(user.methodGetPOJO());
    }
));

export default contact;