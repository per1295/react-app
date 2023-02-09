import React, { FunctionComponent, useRef, useEffect, useContext } from "react";

import Img from "../../globalComponents/Img";
import { CategoryContext } from "./TheMainSecondGroupCaterory";

import "../styles/TheMainSecondGroupCategoryRightItem.scss";

interface TheMainSecondGroupCategoryRightItemProps {
    showForCategories: string[];
    src: string | URL;
    alt: string;
    className?: string;
}

const TheMainSecondGroupCategoryRightItem: FunctionComponent<TheMainSecondGroupCategoryRightItemProps>
=
({ showForCategories, src, alt, className }) => {
    const itemElement = useRef<HTMLImageElement>(null);
    const { category } = useContext(CategoryContext);

    const transitionend = (event: TransitionEvent) => {
        const currentTarget = event.currentTarget as HTMLImageElement;
        currentTarget.classList.add("category_itemVanishComplete");
    }

    useEffect(() => {
        const item = itemElement.current as HTMLImageElement;
        let timeout: NodeJS.Timeout;

        if ( !showForCategories.includes(category) ) {
            item.addEventListener("transitionend", transitionend);
            item.classList.add("category_itemVanish");
        } else {
            item.classList.remove("category_itemVanishComplete");
            timeout = setTimeout(() => {
                item.classList.remove("category_itemVanish");
            }, 0);
        }

        return () => {
            item.removeEventListener("transitionend", transitionend);
            clearTimeout(timeout);
        }
    }, [ category ]);

    return(
        <Img ref={itemElement} src={src} alt={alt} className={className}/>
    )
}

export default TheMainSecondGroupCategoryRightItem;