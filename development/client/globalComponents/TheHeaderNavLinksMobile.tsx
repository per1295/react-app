import React, { useRef, useEffect } from "react";
import { useTypedSelector, useNavigationAnimation } from "../customHooks";
import { NavLink } from "react-router-dom";

import "../globalStyles/TheHeaderNavLinksMobile.scss";

export default function TheHeaderNavLinksMobile() {
    const isMenuOpen = useTypedSelector<"isMenuOpen">(state => state.isMenuOpen);
    const ulRef = useRef<HTMLUListElement>(null);
    const isMenuOpenRef = useRef(false);
    const ulElemHeightRef = useRef<number | null>(null);

    const navLinksArray = [ "Home", "about us", "services", "blog", "contact us" ];

    useEffect(() => {
        const ulElem = ulRef.current;

        if ( ulElem && !ulElemHeightRef.current ) {
            ulElemHeightRef.current = ulElem.offsetHeight;

            ulElem.style.display = "none";
            ulElem.style.height = "0";
        }
    }, []);

    useNavigationAnimation({
        navigationConteinerRef: ulRef,
        condition: isMenuOpen,
        appearFrame: {
            height: `${ulElemHeightRef.current}px`
        },
        appearChildFrame: {
            opacity: "1",
            transform: "translateX(0)"
        },
        disappearChildFrame: {
            opacity: "0",
            transform: "translateX(-20px)"
        },
        childDuration: 300,
        delayStep: 120,
        preCallback: () => {
            const ulElem = ulRef.current;

            if ( ulElem ) ulElem.classList.add("header_navLinksMobileStart");
        },
        postCallback: () => {
            const ulElem = ulRef.current;

            if ( ulElem ) {
                if ( !isMenuOpenRef.current ) ulElem.classList.remove("header_navLinksMobileStart");
            }
        }
    });

    return(
        <ul ref={ulRef} className="header_navLinksMobile">
            {
                navLinksArray.map((item, index) => (
                    <li key={index} className="header_navLinksMobile__item">
                        <NavLink
                        to={encodeURI(`/${item.toLowerCase()}`)}
                        className={
                            ({ isActive }) =>
                            isActive
                            ?
                            "header_navLinksMobile__item___href header_navLinksMobile__item___hrefActive"
                            :
                            "header_navLinksMobile__item___href"
                        }>
                            { item }
                        </NavLink>
                    </li>
                ))
            }
        </ul>
    )
}