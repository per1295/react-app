import { createSlice } from "@reduxjs/toolkit";

const isMenuOpenSlice = createSlice({
    name: "isMenuOpen",
    initialState: false,
    reducers: {
        setMenuOpen() {
            return true;
        },
        setMenuClose() {
            return false;
        }
    }
});

export default isMenuOpenSlice.reducer;
export const { setMenuOpen, setMenuClose } = isMenuOpenSlice.actions;