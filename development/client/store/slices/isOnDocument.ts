import { createSlice } from "@reduxjs/toolkit";

const isOnDocumentSlice = createSlice({
    name: "isOnDocument",
    initialState: true,
    reducers: {
        setIsOnDocumentTrue(state: boolean) {
            return state = true;
        },
        setIsOnDocumentFalse(state: boolean) {
            return state = false;
        }
    }
});

export default isOnDocumentSlice.reducer;
export const { setIsOnDocumentTrue, setIsOnDocumentFalse } = isOnDocumentSlice.actions;