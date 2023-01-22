import React, { PointerEventHandler, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../customHooks";

import "../globalStyles/TheHeaderTopNavLinks.scss";

export default function TheHeaderTopMenuNavLinks() {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const navLinksRef = useRef<HTMLDivElement>(null);

    const navLinksArray = [ "Home", "about us", "services", "blog", "contact us" ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            const navLinksElem = navLinksRef.current as HTMLDivElement;
            const navLinksChildren = Array.from(navLinksElem.children) as HTMLAnchorElement[];

            if ( isMenuOpen ) {
                navLinksChildren.forEach((navLink, index) => {
                    const navLinkAnimation = navLink.animate([
                        {
                            opacity: "0",
                            transform: "translateX(-20px)"
                        },
                        {
                            opacity: "1",
                            transform: "translateX(0)"
                        }
                    ], {
                        duration: 300,
                        delay: 300 * index,
                        fill: "forwards",
                        easing: "ease"
                    });

                    if ( !navLink.getAnimations().length ) navLinkAnimation.persist();
                });
            } else {
                navLinksChildren.reverse().forEach((navLink, index) => {
                    if ( !navLink.getAnimations().length ) return;

                    navLink.animate([
                        {
                            opacity: "1",
                            transform: "translateX(0)"
                        },
                        {
                            opacity: "0",
                            transform: "translateX(20px)"
                        }
                    ], {
                        duration: 300,
                        delay: 300 * index,
                        fill: "forwards",
                        easing: "ease"
                    });
                });
            }
        });

        return () => {
            clearTimeout(timeout);
        }
    }, [ isMenuOpen ]);

    const pointerHandler: PointerEventHandler = event => {
        const navLink = event.currentTarget;
        const type = event.type;

        if ( navLink.classList.contains("header_top__navLinks___linkActive") ) return;

        switch(type) {
            case "pointerenter":
                navLink.classList.add("header_top__navLinks___linkEnter");
                break;
            case "pointerleave":
                navLink.classList.remove("header_top__navLinks___linkEnter");
                break;
        }
    }

    return(
        <div className="header_top__navLinks" ref={navLinksRef}>
            {
                navLinksArray.map((item, index) => (
                    <NavLink
                        key={index}
                        to={encodeURI(`/${item.toLowerCase()}`)}
                        className={
                            ({ isActive }) => (
                                isActive
                                ?
                                "header_top__navLinks___link header_top__navLinks___linkActive"
                                :
                                "header_top__navLinks___link"
                            )
                        }
                        onPointerEnter={pointerHandler}
                        onPointerLeave={pointerHandler}
                    >
                        { item }
                    </NavLink>
                ))
            }
        </div>
    )
}