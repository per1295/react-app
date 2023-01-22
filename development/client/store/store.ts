import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { State } from "./types";

import isMenuOpen from "./slices/isMenuOpen";
import isMobile from "./slices/isMobile";
import isOnDocument from "./slices/isOnDocument";
import isTablet from "./slices/isTablet";
import userData from "./slices/userData";

const store = configureStore<State>({
    reducer: {
        isMenuOpen,
        isMobile,
        isOnDocument,
        isTablet,
        userData
    },
    // @ts-ignore
    middleware(getDefaultMiddleware) {
        return globalThis.__NODE_ENV__ === "development" ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware();
    },
});

export default store;