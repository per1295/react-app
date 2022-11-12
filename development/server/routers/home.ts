import { Router, json } from "express";
import { IEmailData, IAppLocals } from "../types/home";
import { Email } from "../mongoose/home";
import { createResponse } from "../functions";

const jsonParser = json();
const home = Router();
const BASIC_PATH = "/home";

home.post("/email", jsonParser, async (req, res) => {
    try {
        const { email } = req.body as Pick<IEmailData, "email">;
        const { transport, emailResponser, PORT, cookieOptions } = req.app.locals as IAppLocals;
        const emailDocument = await Email.findOne({ email });
        if ( emailDocument ) {
            const { isVerified } = emailDocument;
            return res
                .json(createResponse({
                    status: "success",
                    message: isVerified ? "This email already exist" : "This email needs verification"
                }));
        }

        const randomId = Math.floor(Math.random() * 1e6);
        let newEmail = new Email({ id: randomId, email });
        newEmail = await newEmail.save();

        let confirmURLAdress: string;
        if ( PORT ) {
            confirmURLAdress = `${req.protocol}://${req.hostname}:${PORT}${BASIC_PATH}/confirmEmail`;
        } else {
            confirmURLAdress = `${req.protocol}://${req.hostname}${BASIC_PATH}/confirmEmail`
        }

        await transport.sendMail({
            from: emailResponser,
            to: newEmail.email,
            subject: "Confirm your email.",
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
            .cookie("id", newEmail.id, cookieOptions)
            .cookie("email", newEmail.email, cookieOptions)
            .cookie("isVerified", newEmail.isVerified, cookieOptions)
            .json(createResponse({
                status: "success",
                message: "Follow the link sent to you to confirm your email"
            }));
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
        res.status(404).json(createResponse({
            status: "fail",
            message: "Unknown error"
        }));
    }
});

home.get("/confirmEmail/:idOfEmail", async (req, res) => {
    try {
        const { idOfEmail } = req.params;
        const { cookieOptions } = req.app.locals as IAppLocals;

        let email = await Email.findOne({ id: idOfEmail });

        if ( !email ) {
            return res.send(`
                <h1>
                    This id does not exist
                </h1>
            `);
        }
        email.isVerified = true;
        email = await email.save();

        res
            .clearCookie("isVerified", cookieOptions)
            .cookie("isVerified", true, cookieOptions)
            .send(`
                <h1>
                    Your email has been successfully verified
                </h1>
            `);
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
    }
});

export default home;