import express, { json } from "express";
import { config } from "dotenv";
import { join } from "path";
import { readFile } from "fs/promises";
import { renderToString } from "react-dom/server";
import React from "react";
import createApp from "../client/App";

import { getArgs, wrappedHandlers, setCookies, createRandomId, getApiRoute } from "./functions";
import { Email } from "./mongoose";
import type { Mode, IEmailData } from "../types";

import contact from "./routers/contact";
import blogs from "./routers/blog";

const app = express();

app.disable("x-powered-by");

const jsonParser = json();

config();

const dist = join(process.cwd(), "dist");
app.use(
    express.static(
        join(dist, "client")
    ),
    express.static(
        join(dist, "service-worker")
    )
);

app.use(
    getApiRoute("/contact us"),
    contact
);
app.use(
    getApiRoute("/blog"),
    blogs
);

app.post(getApiRoute("/email"), jsonParser, ...wrappedHandlers(
    async (req, res) => {
        const { email } = req.body as Pick<IEmailData, "email">;

        const emailDocument = await Email.findOne({ email });

        if ( emailDocument ) {
            return res.type("plain").send("This email already exist");
        }

        const randomId = await createRandomId(Email);
        let newEmail = new Email({ id: randomId, email });
        newEmail = await newEmail.save();

        setCookies(res, {
            id: newEmail.id,
            email: newEmail.email
        });

        res.type("plain").send("Email was saved");
    }
))

app.get(/\//, ...wrappedHandlers(
    async (req, res) => {
        process.env.__START_PATH__ = req.path;

        const App = createApp();

        const app = renderToString(<App />);

        const { NODE_ENV } = getArgs() as Record<"NODE_ENV", Mode>;
    
        let html = await readFile(
            join(dist, "server", "index.html"),
            { encoding: "utf-8" }
        );

        html = html
            .replace("<!--ssr-outlet-->", app)
            .replace(
                "<!--additional-script-->",
                `<script>
                    globalThis.__NODE_ENV__ = "${NODE_ENV}";
                </script>`
            )
    
        res.type("html").send(html);
    }
));

export default app;