import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/slices/userData";
import cookie from "cookiejs";
import { checkFields } from "../../functions";
import type { IContactData } from "../../types/contact";

export default function SetUserData() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cookieUserData = cookie.all() as unknown as IContactData;
        
        if ( checkFields(cookieUserData, "id", "email") ) {
            dispatch(
                setUserData(cookieUserData)
            );
        }
    }, []);

    return null;
}