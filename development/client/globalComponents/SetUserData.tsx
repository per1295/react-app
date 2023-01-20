import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/slices/userData";
import cookie from "cookiejs";
import type { IContactData } from "../../types/contact";

export default function SetUserData() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cookieUserData = cookie.all() as unknown as IContactData;
        
        if ( Object.entries(cookieUserData).length >= 2 ) {
            dispatch(
                setUserData(cookieUserData)
            );
        }
    }, []);

    return null;
}