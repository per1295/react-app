import { configureStore } from "@reduxjs/toolkit";
import { State } from "./types";
import isMenuOpen from "./slices/isMenuOpen";
import categoryOption from "./slices/categoryOption";
import isMobile from "./slices/isMobile";
import isOnDocument from "./slices/isOnDocument";
import isTablet from "./slices/isTablet";

const store = configureStore<State>({
    reducer: {
        isMenuOpen,
        categoryOption,
        isMobile,
        isOnDocument,
        isTablet
    }
});

export default store;