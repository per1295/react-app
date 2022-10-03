import { createSlice } from "@reduxjs/toolkit";

const isTabletSlice = createSlice({
    name: "isTablet",
    initialState: false,
    reducers: {
        setIsTabletTrue(state: boolean) {
            return state = true;
        },
        setIsTabletFalse(state: boolean) {
            return state = false;
        }
    }
});

export default isTabletSlice.reducer;
export const { setIsTabletTrue, setIsTabletFalse } = isTabletSlice.actions;