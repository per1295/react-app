import express, { json } from "express";
import cookie from "cookie-parser";
import { config } from "dotenv";
import { join } from "path";
import { readFile } from "fs/promises";
import compression from "compression";

import {
    getArgs,
    wrappedHandlers,
    setCookies,
    getApiRoute
} from "./functions";
import { Email } from "./mongoose/index";
import { ContactData } from "./mongoose/contact";
import { getPathsOfManifest } from "./functions";
import { checkFields } from "../functions";
import type { IEmailData, GetUserCookies } from "../types";

import contact from "./routers/contact";
import blogs from "./routers/blog";

const app = express();

app.disable("x-powered-by");
app.enable("trust proxy");

config();

const { NODE_ENV } = getArgs();

const jsonParser = json();
const cookieParser = cookie(undefined, {
    decode: decodeURIComponent
});
const compressionParser = compression()

app.use(compressionParser);
app.use(cookieParser);

const dist = join(process.cwd(), "dist");

if ( NODE_ENV !== "production" ) {
    (async () => {
        const { middlewareAPI } = await import("./devWebpack");
        app.use(middlewareAPI);
    })();
} else {
    app.use(
        express.static(
            join(dist, "public")
        ),
        express.static(
            join(dist, "client")
        ),
        express.static(
            join(dist, "service-worker")
        )
    );
}

app.use(
    getApiRoute("/contact us"),
    contact
);

app.use(
    getApiRoute("/blog"),
    blogs
);

app.get(getApiRoute("/get user"), ...wrappedHandlers(
    async (req, res) => {
        const cookies = req.cookies as GetUserCookies;
        
        if ( !checkFields(cookies, "id", "email") ) return res.send("Unknown user");

        if ( checkFields(cookies, "id", "name", "email", "object", "message") ) {
            let existUser = await ContactData.findById(cookies.id);

            if ( !existUser ) throw new Error("The user was not defined");

            res.json(existUser.methodGetPOJO());
        } else {
            let existEmail = await Email.findById(cookies.id);

            if ( !existEmail ) throw new Error("The email was not defined");

            res.json(existEmail.methodGetPOJO());
        }
    }
))

app.post(getApiRoute("/email"), jsonParser, ...wrappedHandlers(
    async (req, res) => {
        const { email } = req.body as Pick<IEmailData, "email">;

        const emailDocument = await Email.findOne({ email });

        if ( emailDocument ) {
            return res.send("This email already exist");
        }

        let newEmail = new Email({ email });
        newEmail = await newEmail.save();

        setCookies(res, {
            id: newEmail.id,
            email: newEmail.email
        });

        res.send("Email was saved");
    }
));

setImmediate(() => {
    app.get(/\//, ...wrappedHandlers(
        async (_req, res) => {
            let html = await readFile(
                join(dist, "index.html"),
                { encoding: "utf-8" }
            );

            const manifest = await readFile(
                join(dist, "client", "webpack-manifest.json"),
                { encoding: "utf-8" }
            );

            html = html
            .replace(
                "<!--manifest-css-->",
                getPathsOfManifest(manifest, "css")
            )
            .replace(
                "<!--manifest-js-->",
                getPathsOfManifest(manifest, "js")
            );

            res.send(html);
        }
    ));
});

export default app;