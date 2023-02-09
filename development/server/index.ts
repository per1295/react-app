import { config } from "dotenv";
import mongoose from "mongoose";
import { initMongoDB, getArgs } from "./functions";
import app from "./app";

config();

const { DOCKER_MONGODB_URL, LOCAL_MONGO_URL, PRODUCTION_MONGO_URL, PORT } = process.env;

const MONGOBD_URL = DOCKER_MONGODB_URL || PRODUCTION_MONGO_URL || LOCAL_MONGO_URL as string;

const { NODE_ENV } = getArgs();

process.on("exit", code => console.log(`Proccess was ended with code ${code}`))

async function startApp() {
    mongoose.set("strictQuery", true);

    await mongoose.connect(MONGOBD_URL, { dbName: "react-app" });
    await initMongoDB();

    if ( NODE_ENV !== "production" ) {
        globalThis.__DEVELOPMENT_MIDDLEWARE_API__.waitUntilValid(() => {
            app.listen(PORT, () => {
                console.log(`Server is working on: http://localhost:${PORT}`);
            });
        });
    } else {
        app.listen(PORT, () => {
            console.log(`Server is working on: http://localhost:${PORT}`);
        });
    }
}

startApp();