import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import store from "./store/store";
import { setIsOnDocumentTrue } from "./store/slices/isOnDocument";
import { setDevice } from "./functions";

import createApp from "./App";

window.addEventListener("load", setDevice);
window.addEventListener("orientationchange", setDevice);
window.addEventListener("resize", setDevice);

const setOnDocument = () => store.dispatch( setIsOnDocumentTrue() );

window.addEventListener("pointerdown", setOnDocument);

async function registerServiceWorker() {
    if ( "serviceWorker" in navigator ) {
        if ( !/^https/.test(location.protocol) && !/localhost/.test(location.hostname) ) return;
        const registration = await navigator.serviceWorker.getRegistration("/");
        if ( !registration ) await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
        if ( "Notification" in window && Notification.permission !== "granted" ) await Notification.requestPermission();
    }
}

registerServiceWorker();

const rootElem = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootElem);

const App = createApp();

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);