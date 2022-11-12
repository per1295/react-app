import * as dotenv from "dotenv";
import { createTransport } from "nodemailer";
import { connect } from "mongoose";
import { initMongoDB } from "./functions";
import app from "./app";

dotenv.config();

const MONGOBD_URL = process.env?.DOCKER_MONGODB_URL || process.env?.LOCAL_MONGO_URL as string;
const APP_EMAIL = process.env?.APP_EMAIL;
const APP_PASS = process.env?.APP_PASS;
const PORT = process.env?.PORT;

async function startApp() {
    await connect(MONGOBD_URL);
    await initMongoDB();

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
    app.locals.cookieOptions = {
        expires: new Date(Date.now() + 3.6e6)
    };

    app.listen(PORT, () => {
        console.log("Server is working on:", "\x1b[36m", `http://localhost:${PORT}`);
    });
}

startApp();