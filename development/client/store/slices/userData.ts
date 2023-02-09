import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IContactData } from "../../../types/contact";

const KEYS = [ "id", "email", "message", "name", "object" ];

const userDataSlice = createSlice({
    name: "userData",
    initialState: null as IContactData | null,
    reducers: {
        setUserData: {
            reducer(state, action: PayloadAction<IContactData>) {
                const { payload } = action;
                
                if ( state ) {
                    for ( const [ key, value ] of Object.entries(payload) ) {
                        state[key] = value;
                    }
                } else {
                    return payload;
                }
            },
            prepare: (payload: IContactData) => {
                Object.fromEntries(
                    Object
                    .entries(payload)
                    .map(([key, value]) => [ key, key !== "id" ? decodeURIComponent(value) : value ])
                    .filter(([key]) => KEYS.includes(key))
                );
                
                return { payload };
            }
        }
    }
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;