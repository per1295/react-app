import { createSlice } from "@reduxjs/toolkit";

const isMobileSlice = createSlice({
    name: "isMobile",
    initialState: false,
    reducers: {
        setIsMobileTrue() {
            return true;
        },
        setIsMobileFalse() {
            return false;
        }
    }
});

export default isMobileSlice.reducer;
export const { setIsMobileTrue, setIsMobileFalse } = isMobileSlice.actions;