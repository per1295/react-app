import React, { FunctionComponent, PointerEventHandler, useRef, useEffect } from "react";
import Img from "../../globalComponents/Img";
import "../styles/MainAboutUsThirdGroupTeamItem.scss";
import { useTypedSelector } from "../../customHooks";
import store from "../../store/store";
import { setIsOnDocumentFalse } from "../../store/slices/isOnDocument";

interface MainAboutUsThirdGroupTeamItemProps {
    img: string;
    alt: string;
    index: string;
}

const MainAboutUsThirdGroupTeamItem: FunctionComponent<MainAboutUsThirdGroupTeamItemProps> = ({ img, alt, index }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const imgRef = useRef<HTMLImageElement>(null);
    const backRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    const onEnter = () => {
        const img = imgRef.current as HTMLImageElement, back = backRef.current as HTMLDivElement;
        img.classList.add("mainAboutUs_thirdGroup__team___item____imgActive");
        back.classList.add("mainAboutUs_thirdGroup__team___item____backActive");
    }

    const onLeave = () => {
        const img = imgRef.current as HTMLImageElement, back = backRef.current as HTMLDivElement;
        img.classList.remove("mainAboutUs_thirdGroup__team___item____imgActive");
        back.classList.remove("mainAboutUs_thirdGroup__team___item____backActive");
    }

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        store.dispatch( setIsOnDocumentFalse() );
    };

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) {
            onLeave();
        }
    }, [ isOnDocument ]);

    return(
        <div className="mainAboutUs_thirdGroup__team___item"
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onClick={isMobileOrTablet ? onEnter : undefined}
        onPointerDown={isMobileOrTablet ? onPointerDown : undefined}>
            <Img ref={imgRef} src={img} alt={alt} className="mainAboutUs_thirdGroup__team___item____img"/>
            <div ref={backRef} className="mainAboutUs_thirdGroup__team___item____back">
                { `Part of team: ${index}` }
            </div>
        </div>
    )
}

export default MainAboutUsThirdGroupTeamItem;