import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IContactData } from "../../../types/contact";

const userDataSlice = createSlice({
    name: "userData",
    initialState: null as IContactData | null,
    reducers: {
        setUserData(state, action: PayloadAction<IContactData>) {
            const { payload } = action;

            if ( state !== null ) {
                state.id = payload.id;
                state.email = payload.email;
                state.message = payload.message;
                state.name = payload.name;
                state.object = payload.object;
            } else {
                return payload;
            }
        }
    }
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;