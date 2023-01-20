import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ChangeTitle() {
    const location = useLocation();

    useEffect(() => {
        if ( location.pathname !== "/" ) {
            let titleArray = location.pathname.replace(/^\//, "").split("");
            titleArray[0] = titleArray[0].toUpperCase();
            document.title = decodeURIComponent(titleArray.join(""));
        }
    }, [ location.pathname ]);

    return null;
}