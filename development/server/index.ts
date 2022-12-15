import * as dotenv from "dotenv";
import { createTransport } from "nodemailer";
import { connect } from "mongoose";
import { initMongoDB } from "./functions";
import app from "./app";

dotenv.config();

const { DOCKER_MONGODB_URL, LOCAL_MONGO_URL, PRODUCTION_MONGO_URL } = process.env;

const MONGOBD_URL = DOCKER_MONGODB_URL || PRODUCTION_MONGO_URL || LOCAL_MONGO_URL as string;
const APP_EMAIL = process.env?.APP_EMAIL;
const APP_PASS = process.env?.APP_PASS;
const PORT = process.env?.PORT;

async function startApp() {
    await connect(MONGOBD_URL, { dbName: "react-app" });
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
        console.log(`Server is working on: http://localhost:${PORT}`);
    });
}

startApp();