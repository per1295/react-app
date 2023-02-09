import React, { MouseEvent, PointerEventHandler, useEffect, useRef } from "react";
import { useTypedSelector } from "../customHooks";
import store from "../store/store";
import { setIsOnDocumentFalse } from "../store/slices/isOnDocument";
import IconList from "@reacticons/ionicons/lib/components/iconList.json";

import IonIcon from "@reacticons/ionicons";

import "../globalStyles/TheFooterConteinerIcons.scss";

const TheFooterConteinerIcons = () => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const iconsConteinerRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    const namesIcons = [
        "logo-facebook",
        "logo-twitter",
        "logo-youtube",
        "logo-linkedin",
        "logo-pinterest",
        "logo-instagram"
    ] as unknown as (keyof typeof IconList)[];

    useEffect(() => {
        if ( isMobileOrTablet ) {
            if ( isOnDocument ) {
                const iconsConteiner = iconsConteinerRef.current as HTMLDivElement;
                const icons = iconsConteiner.children as HTMLCollectionOf<HTMLElement>;
                Array.from(icons).forEach((item, index) => {
                    const logoName = namesIcons[index].replace(/\-/g, "_");
                    item.classList.remove(`${logoName}Active`);
                });
            }
        }
    }, [ isOnDocument, isMobileOrTablet ]);

    const onEnter = (event: MouseEvent, logoName: string) => {
        const logo = event.currentTarget as HTMLDivElement;
        logoName = logoName.replace(/\-/g, "_");
        logo.classList.add(`${logoName}Active`);
    }

    const onLeave = (event: MouseEvent, logoName: string) => {
        const logo = event.currentTarget as HTMLDivElement;
        logoName = logoName.replace(/\-/g, "_");
        logo.classList.remove(`${logoName}Active`);
    }

    const onPointerDown: PointerEventHandler<HTMLElement> = (event) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    }

    return(
        <div className="footer_conteiner__icons" ref={iconsConteinerRef}>
            { namesIcons.map((item, index) => (
                <IonIcon
                    key={index}
                    name={item}
                    className="footer_conteiner__icons___icon"
                    onPointerEnter={isMobileOrTablet ? undefined : (event) => onEnter(event, item)}
                    onPointerLeave={isMobileOrTablet ? undefined : (event) => onLeave(event, item)}
                    onClick={isMobileOrTablet ? (event) => onEnter(event, item) : undefined}
                    onPointerDown={isMobileOrTablet ? onPointerDown : undefined}
                />
            )) }    
        </div>
    )
}

export default TheFooterConteinerIcons;