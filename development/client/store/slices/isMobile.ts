import { createSlice } from "@reduxjs/toolkit";

const isMobileSlice = createSlice({
    name: "isMobile",
    initialState: false,
    reducers: {
        setIsMobileTrue(state: boolean) {
            return state = true;
        },
        setIsMobileFalse(state: boolean) {
            return state = false;
        }
    }
});

export default isMobileSlice.reducer;
export const { setIsMobileTrue, setIsMobileFalse } = isMobileSlice.actions;