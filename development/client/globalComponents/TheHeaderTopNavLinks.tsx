import React, { PointerEventHandler, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTypedSelector, useNavigationAnimation } from "../customHooks";

import "../globalStyles/TheHeaderTopNavLinks.scss";

export default function TheHeaderTopMenuNavLinks() {
    const isMenuOpen = useTypedSelector((state) => state.isMenuOpen) as boolean;
    const navLinksRef = useRef<HTMLDivElement>(null);
    const navLinksArray = [ "home", "about us", "services", "blog", "contact us" ];

    useNavigationAnimation({
        navigationConteinerRef: navLinksRef,
        condition: isMenuOpen,
        appearChildFrame: {
            opacity: "1",
            transform: "translateX(0)"
        },
        disappearChildFrame: {
            opacity: "0",
            transform: "translateX(20px)"
        }
    });

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
                        to={encodeURIComponent(item.toLowerCase())}
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