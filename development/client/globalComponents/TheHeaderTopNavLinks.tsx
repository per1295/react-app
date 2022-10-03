import React, { PointerEventHandler, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../globalStyles/TheHeaderTopNavLinks.scss";
import { useTypedSelector, useDispatch } from "../customHooks";
import { setMenuClose } from "../store/slices/isMenuOpen";

export default function TheHeaderTopMenuNavLinks() {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const dispatch = useDispatch();
    const navLinksElem = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
    const location = useLocation();

    const navLinksArray = [ "Home", "about us", "services", "portfolio", "blog", "contact us" ];

    useEffect(() => {
        return () => {
            dispatch( setMenuClose() );
        }
    }, [ location ]);

    useEffect(() => {
        const navLinks = navLinksElem.current as HTMLDivElement;
        const timeouts = timeoutsRef.current;

        const navLinksChildren = navLinks.children as HTMLCollectionOf<HTMLAnchorElement>;
        const firstNavLink = Array.from(navLinksChildren)[0];

        const firstNavLinkListener = () => {
            navLinks.classList.remove("header_top__navLinksActive");
        }

        if ( isMenuOpen ) {
            navLinks.classList.add("header_top__navLinksActive");
            firstNavLink.removeEventListener("transitionend", firstNavLinkListener);

            Array.from(navLinksChildren).forEach((item, index) => {
                const timeoutLink = setTimeout(() => {
                    item.classList.add("header_top__navLinks___linkAppear");
                }, 250 * index);
                timeouts.add(timeoutLink);
            });
        } else {
            firstNavLink.addEventListener("transitionend", firstNavLinkListener);

            const reverseNavLinksChildren = Array.from(navLinksChildren).reverse(); 
            reverseNavLinksChildren.forEach((item, index) => {
                const timeoutLink = setTimeout(() => {
                    item.classList.remove("header_top__navLinks___linkAppear");
                }, 250 * index);
                timeouts.add(timeoutLink);
            });
        }

        return () => {
            timeouts.forEach(item => clearTimeout(item));
            timeouts.clear();
            firstNavLink.removeEventListener("transitionend", firstNavLinkListener);
        }
    }, [ isMenuOpen ]);

    const onEnter: PointerEventHandler = ( event ) => {
        const navLink = event.currentTarget as HTMLLinkElement;
        const isActive = navLink.classList.contains("header_top__navLinks___linkActive");

        if ( !isActive ) {
            navLink.classList.add("header_top__navLinks___linkEnter");
        }
    }

    const onLeave: PointerEventHandler = ( event ) => {
        const navLink = event.currentTarget as HTMLLinkElement;
        const isActive = navLink.classList.contains("header_top__navLinks___linkActive");

        if ( !isActive ) {
            navLink.classList.remove("header_top__navLinks___linkEnter");
        }
    }

    return(
        <div className="header_top__navLinks" ref={navLinksElem}>
            {
                navLinksArray.map((item, index) => (
                    <NavLink key={index} to={`/${item.toLowerCase()}`} className={
                        ({ isActive }) => (
                            isActive
                            ?
                            "header_top__navLinks___link header_top__navLinks___linkActive"
                            :
                            "header_top__navLinks___link"
                        )
                    }
                    onPointerEnter={onEnter} onPointerLeave={onLeave}>
                        { item }
                    </NavLink>
                ))
            }
        </div>
    )
}