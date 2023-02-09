import React, { FunctionComponent, PointerEventHandler, useEffect, useRef } from "react";
import { useTypedSelector } from "../../customHooks";
import store from "../../store/store";
import { setIsOnDocumentFalse } from "../../store/slices/isOnDocument";

import "../styles/MainBlogColumnItemTagsTag.scss";

interface MainBlogColumnItemTagsTagProps {
    children: string;
}

const MainBlogColumnItemTagsTag: FunctionComponent<MainBlogColumnItemTagsTagProps> = ({ children }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const tagRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    const pointerHandler = (typeEvent: string) => {
        const tag = tagRef.current as HTMLDivElement;

        switch(typeEvent) {
            case "pointerenter":
            case "click":
                tag.classList.add("mainBlog_column__item___tags____tagActive");
                break;
            case "pointerleave":
                tag.classList.remove("mainBlog_column__item___tags____tagActive");
                break;
        }
    }

    const callPointerHandler: PointerEventHandler<HTMLDivElement> = event => pointerHandler(event.type);

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) pointerHandler("pointerleave");
    }, [ isOnDocument ]);

    const pointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    }

    return(
        <div
        ref={tagRef}
        onPointerDown={pointerDown}
        className={`mainBlog_column__item___tags____tag mainBlog_column__item___tags____tag${children}`}
        onPointerEnter={isMobileOrTablet ? undefined : callPointerHandler}
        onPointerLeave={isMobileOrTablet ? undefined : callPointerHandler}
        onClick={isMobileOrTablet ? callPointerHandler : undefined}>
            { children }
        </div>
    )
}

export default MainBlogColumnItemTagsTag;