import { Router, json } from "express";
import { IContactData } from "../types/contact";
import { IAppLocals } from "../types/home";
import { ContactData } from "../mongoose/contact";
import { Response } from "../constructors";
import { optionsCookie } from "../functions";

const jsonParser = json();
const contact = Router();
const BASIC_PATH = encodeURI("/contact us");

contact.post("/user", jsonParser, async (req, res) => {
    try {
        const { name, email, object, message } = req.body as IContactData;
        const { transport, PORT, emailResponser } = req.app.locals as IAppLocals;
        let existUser = await ContactData.findOne({ email });

        if ( existUser ) {
            return res
                    .cookie("id", existUser.id, optionsCookie())
                    .cookie("name", existUser.name, optionsCookie())
                    .cookie("email", existUser.email, optionsCookie())
                    .cookie("object", existUser.object, optionsCookie())
                    .cookie("message", existUser.message, optionsCookie())
                    .cookie("isVerified", existUser.isVerified, optionsCookie())
                    .json(
                        new Response({
                            status: "success",
                            message: existUser.isVerified ? "This user already exist" : "This user needs verification"
                        })
                    );
        }

        const randomId = Math.floor(Math.random() * 1e6);
        const newUser = new ContactData({ id: randomId, name, email, object, message });
        const user = await newUser.save();

        let confirmURLAdress: string;
        if ( PORT ) {
            confirmURLAdress = `${req.protocol}://${req.hostname}:${PORT}${BASIC_PATH}/confirmUser/${randomId}`;
        } else {
            confirmURLAdress = `${req.protocol}://${req.hostname}${BASIC_PATH}/confirmUser/${randomId}`
        }

        await transport.sendMail({
            from: emailResponser,
            to: user.email,
            subject: "Confirm your form",
            html: `
                <h1>
                    Follow the link: <a href="${confirmURLAdress}">${confirmURLAdress}</a>
                </h1>
            `,
            text: `
                Follow the link: ${confirmURLAdress}
            `
        });

        res
            .cookie("id", user.id, optionsCookie())
            .cookie("name", user.name, optionsCookie())
            .cookie("email", user.email, optionsCookie())
            .cookie("object", user.object, optionsCookie())
            .cookie("message", user.message, optionsCookie())
            .cookie("isVerified", false, optionsCookie())
            .json(
                new Response({
                    status: "success",
                    message: "Confirm your data by email"
                })
            );
    } catch (error) {
        const err = error as Error;
        console.error(`${err.name}: ${err.message}`);
        res.status(404).json(
            new Response({
                status: "fail",
                message: "Unknown error"
            })
        );
    }

});

contact.get("/confirmUser/:idUser", async (req, res) => {
    const { idUser } = req.params;
    let user = await ContactData.findOne({ id: idUser });
    if ( !user ) {
        return res.send(`
            <h1>
                This id does not exist
            </h1>
        `);
    }
    user.isVerified = true;
    user = await user.save();

    res
        .clearCookie("isVerified", optionsCookie())
        .cookie("isVerified", true, optionsCookie())
        .send(`
            <h1>
                Your email has been successfully verified
            </h1>
        `);
});

export default contact;