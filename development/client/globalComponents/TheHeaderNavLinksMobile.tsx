import React, { useRef, useEffect } from "react";
import { useTypedSelector, useDispatch } from "../customHooks";
import { NavLink, useLocation } from "react-router-dom";
import "../globalStyles/TheHeaderNavLinksMobile.scss";
import { setMenuClose } from "../store/slices/isMenuOpen";

interface Animations {
    animation: Animation | undefined;
    childrenAnimations: Set<Animation>;
}

type AnimationsKeys = keyof Animations;
type AnimationsValues = Animations[AnimationsKeys];

export default function TheHeaderNavLinksMobile() {
    const ulElem = useRef<HTMLUListElement>(null);
    const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());
    const animationsRef = useRef<Map<AnimationsKeys, AnimationsValues>>(new Map([
        [ "childrenAnimations", new Set() ]
    ]));
    const isMenuOpen = useTypedSelector<"isMenuOpen">(state => state.isMenuOpen);
    const dispatch = useDispatch();
    const location = useLocation();

    const navLinksArray = [ "Home", "about us", "services", "blog", "contact us" ];
    const ulHeight = 338;
    const ulAnimationFrames = [
        {
            height: 0,
            transform: "scaleY(0)"
        },
        {
            height: `${ulHeight}px`,
            transform: "scaleY(1)"
        }
    ];
    const ulChildrenFrames = [
        {
            transform: "translateX(-20px)",
            opacity: 0
        },
        {
            transform: "translateX(0)",
            opacity: 1
        }
    ];

    useEffect(() => {
        return () => {
            dispatch( setMenuClose() );
        }
    }, [ location ]);

    useEffect(() => {
        const ul = ulElem.current as HTMLUListElement;
        const animations = animationsRef.current;
        const timeouts = timeoutsRef.current;

        const animation = animations.get("animation") as Animation | undefined;
        const childrenAnimations = animations.get("childrenAnimations") as Set<Animation>;
        const ulChildren = ul.children as HTMLCollectionOf<HTMLLIElement>;
        const children = Array.from(ulChildren);

        const onFinish = () => ul.classList.remove("header_navLinksMobileStart");

        if ( isMenuOpen ) {
            ul.classList.add("header_navLinksMobileStart");
            if ( animation ) {
                animation.removeEventListener("finish", onFinish);
                const timeout = setTimeout(() => {
                    animation.reverse();
                    Array.from(childrenAnimations).forEach((item, index) => {
                        const childTimeout = setTimeout(() => item.reverse(), 100 * index);
                        timeouts.add(childTimeout);
                    });
                }, 0);
                timeouts.add(timeout);
            } else {
                const timeout = setTimeout(() => {
                    const animationItem = ul.animate(ulAnimationFrames, {
                        duration: 500,
                        easing: "linear",
                        fill: "forwards"
                    });
                    animations.set("animation", animationItem);
    
                    children.forEach((item, index) => {
                        const childTimeout = setTimeout(() => {
                            const childrenAnimationsItem = item.animate(ulChildrenFrames, {
                                duration: 250,
                                easing: "linear",
                                fill: "forwards"
                            });
                            if ( !childrenAnimations.has(childrenAnimationsItem) ) childrenAnimations.add(childrenAnimationsItem);
                        }, 100 * index);
                        timeouts.add(childTimeout);
                    });
                }, 0);
                timeouts.add(timeout);
            }
        } else {
            if ( animation ) {
                animation.addEventListener("finish", onFinish);
                animation.reverse();
            } else {
                onFinish();
            }
            Array.from(childrenAnimations).reverse().forEach((item, index) => {
                const childTimeout = setTimeout(() => item.reverse(), 100 * index);
                timeouts.add(childTimeout);
            });
        }

        return () => {
            timeouts.forEach(item => clearTimeout(item));
            timeouts.clear();
            if ( animation ) animation.removeEventListener("finish", onFinish);
        }
    }, [ isMenuOpen ]);

    return(
        <ul ref={ulElem} className="header_navLinksMobile">
            {
                navLinksArray.map((item, index) => (
                    <li key={index} className="header_navLinksMobile__item">
                        <NavLink
                        to={`/${item.toLowerCase()}`}
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