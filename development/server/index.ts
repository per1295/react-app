import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { initMongoDB } from "./functions";
import app from "./app";

dotenv.config();

const { DOCKER_MONGODB_URL, LOCAL_MONGO_URL, PRODUCTION_MONGO_URL } = process.env;

const MONGOBD_URL = DOCKER_MONGODB_URL || PRODUCTION_MONGO_URL || LOCAL_MONGO_URL as string;
const PORT = process.env?.PORT || "3000";

async function startApp() {
    mongoose.set("strictQuery", true);

    await mongoose.connect(MONGOBD_URL, { dbName: "react-app" });
    await initMongoDB();

    app.listen(PORT, () => {
        console.log(`Server is working on: http://localhost:${PORT}`);
    });
}

startApp();