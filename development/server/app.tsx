import express from "express";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { renderToString } from "react-dom/server";
import React, { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import UpperApp from "../client/App";
import home from "./routers/home";
import contact from "./routers/contact";
import blog from "./routers/blog";
import { Response } from "./constructors";

const app = express();

dotenv.config();

const HOME_PATH = process.env?.HOME_PATH as string;
const CONTACT_PATH = encodeURI(process.env?.CONTACT_PATH as string);
const BLOG_PATH = process.env?.BLOG_PATH as string;

app.use(
    express.static(
        resolve(__dirname, "../client")
    ),
    express.static(
        resolve(__dirname, "../service-worker")
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

        const env = process.argv[2];
    
        const html = `
        <!DOCTYPE html>
        <html lang="en" translate="no">
        <head>
            <meta charset="UTF-8">
            <title>Loading...</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/png" href="/icon.png">
            <link rel="manifest" href="/manifest.json">
            <script fetchpriority="high" src="/sw.js"></script>
            <link rel="stylesheet" href="/index.css">
            <script src="/redux_toolkit.bundle.js"></script>
            ${env === 'development' ? '<script src="/react.bundle.js"></script>' : ''}
            <script src="/runtime~index.js"></script>
            <script src="/${env === 'development' ? 'vendors-node_modules_fontsource_montserrat_index_css-node_modules_fontsource_open-sans_index_-fe1f59' : '486'}.js"></script>
            <script defer src="/index.js"></script>
        </head>
        <body>
            <div id="root" translate="no">${app}</div>
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

export default app;