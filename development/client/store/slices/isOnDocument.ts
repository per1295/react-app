import { createSlice } from "@reduxjs/toolkit";

const isOnDocumentSlice = createSlice({
    name: "isOnDocument",
    initialState: true,
    reducers: {
        setIsOnDocumentTrue() {
            return true;
        },
        setIsOnDocumentFalse() {
            return false;
        }
    }
});

export default isOnDocumentSlice.reducer;
export const { setIsOnDocumentTrue, setIsOnDocumentFalse } = isOnDocumentSlice.actions;