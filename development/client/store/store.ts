import { configureStore } from "@reduxjs/toolkit";
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
    }
});

export default store;