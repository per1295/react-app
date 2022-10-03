import { createSlice } from "@reduxjs/toolkit";

const isMenuOpenSlice = createSlice({
    name: "isMenuOpen",
    initialState: false,
    reducers: {
        setMenuOpen(state: boolean) {
            return state = true;
        },
        setMenuClose(state: boolean) {
            return state = false;
        }
    }
});

export default isMenuOpenSlice.reducer;
export const { setMenuOpen, setMenuClose } = isMenuOpenSlice.actions;