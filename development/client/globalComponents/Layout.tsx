import React, { useMemo, useEffect } from "react";
import { useMatch, useLocation, Outlet } from "react-router-dom";
import { setMenuClose } from "../store/slices/isMenuOpen";
import { useDispatch } from "react-redux";

import TheHeader from "./TheHeader";
import TheHomeHeader from "./TheHomeHeader";
import ChangeTitle from "./ChangeTitle";
import TheFooter from "./TheFooter";
import SetUserData from "./SetUserData";

export default function Layout() {
    const match = useMatch("/home");
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setMenuClose() );
    }, [ location.pathname ]);

    const [ title, underTitle ] = useMemo(() => {
        const result: string[] = [];
        let { pathname } = location;
        const mathTitle = pathname.match(/^\/[\w\-\s]+\/?/);

        if ( mathTitle ) {
            let title = mathTitle.toString().replace(/\//g, "").trim();

            if ( /\s/.test(title) ) {
                result.push(title);
            } else {
                switch(title) {
                    case "services":
                        title = "our services"
                        break;
                    case "blogs":
                        title = "blog posts"
                        break;
                }

                result.push(title);
            }

            let underTitle: string;

            switch(title) {
                case "our services":
                    underTitle = title.split(" ")[1];
                    break;
                default:
                    underTitle = title.split(" ")[0];
                    break;
            }

            underTitle = `home / ${underTitle}`;

            result.push(underTitle);
        } 

        return result;
    }, [ location.pathname ]);

    return(
        <>
            <SetUserData />
            <ChangeTitle />
            { Boolean(match) ? <TheHomeHeader /> : <TheHeader title={title ?? ""} underTitle={underTitle ?? ""} /> }
            <Outlet />
            <TheFooter />
        </>
    )
}