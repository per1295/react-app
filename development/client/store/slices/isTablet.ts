import { createSlice } from "@reduxjs/toolkit";

const isTabletSlice = createSlice({
    name: "isTablet",
    initialState: false,
    reducers: {
        setIsTabletTrue() {
            return true;
        },
        setIsTabletFalse() {
            return false;
        }
    }
});

export default isTabletSlice.reducer;
export const { setIsTabletTrue, setIsTabletFalse } = isTabletSlice.actions;