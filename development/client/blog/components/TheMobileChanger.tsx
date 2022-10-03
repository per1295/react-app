import React, { FunctionComponent, MouseEventHandler, useEffect, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import "../styles/TheMobileChanger.scss";

interface TheMobileChangerProps {
    isShow: boolean;
}

const TheMobileChanger: FunctionComponent<TheMobileChangerProps> = ({ isShow }) => {
    const mobileChangerRef = useRef<HTMLDivElement>(null);
    const [ nowMobileActive, setNowMobileActive ] = useState<"blog" | "column">("blog");

    useEffect(() => {
        const mobileChanger = mobileChangerRef.current as HTMLDivElement;
        if ( isShow ) mobileChanger.classList.add("mobileChangerActive");
        else mobileChanger.classList.remove("mobileChangerActive");
    }, [ isShow ]);

    const clickArrow: MouseEventHandler<HTMLElement> = (event) => {
        const nowArrow = event.currentTarget,
        prevElement = nowArrow.previousElementSibling,
        nextElement = nowArrow.nextElementSibling;

        nowArrow.classList.remove("mobileChanger_activeArrow");

        if ( prevElement ) prevElement.classList.add("mobileChanger_activeArrow");
        if ( nextElement ) nextElement.classList.add("mobileChanger_activeArrow");

        const mobileActive = nowArrow.dataset.mobileActive as "blog" | "column";

        switch(mobileActive) {
            case "blog":
                setNowMobileActive(mobileActive);
                break;
            case "column":
                setNowMobileActive(mobileActive);
                break;
        }
    }

    useEffect(() => {
        const mainBlog = document.querySelector(".mainBlog") as HTMLElement;
        const children = mainBlog.children as HTMLCollectionOf<HTMLDivElement>;
        const childrenArr = Array.from(children);
        switch(nowMobileActive) {
            case "blog":
                childrenArr[0].style.height = "auto";
                childrenArr[0].style.maxHeight = "none";
                childrenArr.forEach(item => {
                    item.style.transform = "translateX(0)";
                });
                break;
            case "column":
                childrenArr[0].style.height = "0";
                childrenArr[0].style.maxHeight = "0";
                childrenArr.forEach(item => {
                    item.style.transform = "translateX(calc(-100% - 40px))";
                });
                break;
        }
    }, [ nowMobileActive ]);

    return(
        <div className="mobileChanger mobileChangerActive" ref={mobileChangerRef}>
            <IonIcon
            data-mobile-active="blog"
            name="arrow-back-circle-outline"
            className="mobileChanger_blogArrow"
            onClick={clickArrow}
            />
            <IonIcon
            data-mobile-active="column"
            name="arrow-forward-circle-outline"
            className="mobileChanger_columnArrow mobileChanger_activeArrow"
            onClick={clickArrow}
            />
        </div>
    )
}

export default TheMobileChanger;