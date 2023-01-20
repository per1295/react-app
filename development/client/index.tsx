import { hydrateRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { setIsMobileTrue, setIsMobileFalse } from "./store/slices/isMobile";
import { setIsOnDocumentTrue } from "./store/slices/isOnDocument";
import { setIsTabletTrue, setIsTabletFalse } from "./store/slices/isTablet";

import "@fontsource/montserrat";
import "@fontsource/open-sans";

import App from "./App";

type Agent = "phone" | "tablet";

function isAgent(agent: Agent): boolean {
    const { userAgent } = navigator;
    let regExp: RegExp;
    switch(agent) {
        case "phone": 
            regExp = /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/ig;
            break;
        case "tablet":
            regExp = /iPad/ig;
            break;
        default:
            return false;
    }
    return regExp.test(userAgent);
}

function setDevice() {
    const isMobile = matchMedia("(max-width: 750px)").matches || isAgent("phone");
    const isTablet = matchMedia("(min-width: 750px) and (max-width: 1024px)").matches || isAgent("tablet");

    if ( isMobile ) store.dispatch( setIsMobileTrue() );
    else store.dispatch( setIsMobileFalse() );

    if ( isTablet ) store.dispatch( setIsTabletTrue() );
    else store.dispatch( setIsTabletFalse() );
}

window.addEventListener("load", setDevice);
window.addEventListener("orientationchange", setDevice);
window.addEventListener("resize", setDevice);

const setOnDocument = () => store.dispatch( setIsOnDocumentTrue() );

window.addEventListener("pointerdown", setOnDocument);

async function registerServiceWorker() {
    if ( "serviceWorker" in navigator ) {
        if ( !/^https/.test(location.protocol) && location.hostname !== "localhost" ) return;
        const registration = await navigator.serviceWorker.getRegistration("/");
        if ( registration ) await registration.update();
        else await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
    }
}

registerServiceWorker();

const root = document.getElementById("root") as HTMLDivElement;

hydrateRoot(
    root,
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
)