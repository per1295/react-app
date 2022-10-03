import "dotenv/config";
import express from "express";
import { resolve } from "path";
import { renderToString } from "react-dom/server";
import React, { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import UpperApp from "../client/App";
import home from "./routers/home";
import contact from "./routers/contact";
import blog from "./routers/blog";
import { connect } from "mongoose";
import { createTransport } from "nodemailer";
import { Response } from "./constructors";

const app = express();
const MONGOBD_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/react-app";
const APP_EMAIL = process.env.APP_EMAIL;
const APP_PASS = process.env.APP_PASS;
const PORT = process.env.PORT || 9000;
const HOME_PATH = "/home";
const CONTACT_PATH = encodeURI("/contact us");
const BLOG_PATH = "/blog";

app.use(
    express.static(
        resolve(__dirname, "../client")
    )
);

app.use(HOME_PATH, home);
app.use(CONTACT_PATH, contact);
app.use(BLOG_PATH, blog);

app.get(/\//, (req, res) => {
    try {
        const app = renderToString(
            <StrictMode>
                <StaticRouter location={req.url}>
                    <UpperApp/>
                </StaticRouter>
            </StrictMode>
        );
    
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/png" href="/icon.png">
            <script defer src="/runtime~index.js"></script>
            <script defer src="/redux_toolkit.bundle.js"></script>
            ${process.argv[2] === "development" ? '<script defer src="/react.bundle.js"></script>' : ""}
            <script defer src="/${process.argv[2] === "development" ? "vendors-node_modules_fontsource_montserrat_index_css-node_modules_fontsource_open-sans_index_-fe1f59" : "486"}.js"></script>
            <script defer src="/index.js"></script>
            <link rel="stylesheet" href="/index.css">
            <title>React-app</title>
        </head>
        <body>
            <div id="root">${app}</div>
        </body>
        </html>
        `;
    
        res.type("html").send(html);
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
        res.status(404).json(
            new Response({
                status: "fail",
                message: "Unknown error"
            })
        );
    }
});

async function startApp() {
    try {
        await connect(MONGOBD_URL);

        app.locals.transport = createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: APP_EMAIL,
                pass: APP_PASS
            }
        });
        app.locals.emailResponser = APP_EMAIL;
        app.locals.PORT = PORT;

        app.listen(PORT, () => {
            console.log("Server is running.");
        });
    } catch (error) {
        const errorTyped = error as Error;
        console.error(`${errorTyped.name}: ${errorTyped.message}`);
    }
}

startApp();