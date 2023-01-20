import React, { useRef, useEffect } from "react";
import { useTypedSelector } from "../customHooks";
import { NavLink } from "react-router-dom";

import "../globalStyles/TheHeaderNavLinksMobile.scss";

export default function TheHeaderNavLinksMobile() {
    const isMenuOpen = useTypedSelector<"isMenuOpen">(state => state.isMenuOpen);
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            isMenuOpenRef.current = isMenuOpen;

            const ulElem = ulRef.current as HTMLUListElement;
            const liElements = Array.from(ulElem.children) as HTMLLIElement[];
            const ulElemHeight = ulElemHeightRef.current;

            if ( isMenuOpen && isMobile && ulElemHeight ) {
                ulElem.classList.add("header_navLinksMobileStart");

                setTimeout(() => {
                    const ulAnimation = ulElem.animate([
                        {
                            height: 0
                        },
                        {
                            height: ulElemHeight + "px"
                        }
                    ], {
                        duration: 500,
                        fill: "forwards",
                        easing: "linear"
                    });

                    ulAnimation.persist();

                    ulAnimation.addEventListener("finish", () => {
                        if ( !isMenuOpenRef.current ) ulElem.classList.remove("header_navLinksMobileStart");
                    });

                    liElements.forEach((liElement, index) => {
                        liElement.animate([
                            {
                                transform: "translateX(-20px)",
                                opacity: "0"
                            },
                            {
                                transform: "translateX(0)",
                                opacity: "1"
                            }
                        ], {
                            duration: 100,
                            delay: 100 * (index + 1),
                            easing: "linear",
                            fill: "forwards"
                        });
                    });
                });
            } else if ( isMobile ) {
                liElements.reverse().forEach((liElement, index) => {
                    liElement.animate([
                        {
                            transform: "translateX(0)",
                            opacity: "1"
                        },
                        {
                            transform: "translateX(-20px)",
                            opacity: "0"
                        }
                    ], {
                        duration: 100,
                        delay: 100 * (index + 1),
                        easing: "linear",
                        fill: "forwards"
                    });
                });

                const ulAnimation = ulElem.getAnimations().at(0);
                const otherAnimations = ulElem.getAnimations().slice(1);

                if ( ulAnimation ) setTimeout(() => ulAnimation.reverse(), 200);
                if ( otherAnimations.length ) otherAnimations.forEach(otherAnimation => otherAnimation.cancel());
            }
        });

        return () => {
            clearTimeout(timeout);
        }
    }, [ isMenuOpen ]);

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