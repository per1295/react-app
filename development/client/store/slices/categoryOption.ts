import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categoryOptionSlice = createSlice({
    name: "categoryOption",
    initialState: "all",
    reducers: {
        setOption(state: string, action: PayloadAction<string>) {
            return state = action.payload;
        }
    }
});

export default categoryOptionSlice.reducer;
export const { setOption } = categoryOptionSlice.actions; 