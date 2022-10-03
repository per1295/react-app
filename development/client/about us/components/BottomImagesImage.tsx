import React, { FunctionComponent, PointerEventHandler, useEffect, useRef } from "react";
import Img from "../../globalComponents/Img";
import "../styles/BottomImagesImage.scss";
import { useTypedSelector, useDispatch } from "../../customHooks";
import { setIsOnDocumentFalse } from "../../store/slices/isOnDocument";

interface BottomImagesImageProps {
    img: string;
    alt: string;
}

const BottomImagesImage: FunctionComponent<BottomImagesImageProps> = ({ img, alt }) => {
    const isMobile = useTypedSelector<"isMobile">(state => state.isMobile);
    const isTablet = useTypedSelector<"isTablet">(state => state.isTablet);
    const isOnDocument = useTypedSelector<"isOnDocument">(state => state.isOnDocument);
    const dispatch = useDispatch();
    const imageRef = useRef<HTMLDivElement>(null);

    const isMobileOrTablet = isMobile || isTablet;

    useEffect(() => {
        if ( isMobileOrTablet && isOnDocument ) {
            const conteinerImage = imageRef.current as HTMLDivElement;
            conteinerImage.classList.remove("mainAboutUs_thirdGroup__bottom___images____conteinerImageActive");
        }
    }, [ isOnDocument ]);

    const onEnter: PointerEventHandler<HTMLDivElement> = (event) => {
        const conteinerImage = event.currentTarget as HTMLDivElement;
        conteinerImage.classList.add("mainAboutUs_thirdGroup__bottom___images____conteinerImageActive");
    }

    const onLeave: PointerEventHandler<HTMLDivElement> = (event) => {
        const conteinerImage = event.currentTarget as HTMLDivElement;
        conteinerImage.classList.remove("mainAboutUs_thirdGroup__bottom___images____conteinerImageActive");
    }

    const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        dispatch( setIsOnDocumentFalse() );
    }

    return(
        <div
        ref={imageRef}
        onPointerEnter={isMobileOrTablet ? undefined : onEnter}
        onPointerLeave={isMobileOrTablet ? undefined : onLeave}
        onPointerDown={isMobileOrTablet ? onPointerDown : undefined}
        onClick={isMobileOrTablet ? onEnter : undefined}
        className="mainAboutUs_thirdGroup__bottom___images____conteinerImage">
            <Img src={img} alt={alt} className="mainAboutUs_thirdGroup__bottom___images____conteinerImage_____img"/>
        </div>
    )
}

export default BottomImagesImage