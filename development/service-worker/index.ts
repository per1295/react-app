import "regenerator-runtime/runtime";

import onlineImg from "./images/internet-access.png";
import offlineImg from "./images/offline-internet.png";

async function startWebWorker() {
    const globalScope = self as unknown as ServiceWorkerGlobalScope;

    let masOfSourceIcons = [
        "/icon.png", "/manifest.json", "/runtime~service-worker.js",
        "/sw-libraries.bundle.js", "/service-worker.js", "/runtime~client.js",
        "/client-libraries.bundle.js", "/client.js", "/index.css"
    ];

    globalScope.addEventListener("online", () => {
        if ( !("Notification" in self) ) return;

        if ( Notification.permission !== "granted" ) return;

        const goToSiteNotification = new Notification("web-app", {
            body: "It looks like you have a connection, don`t want to visit the web-app",
            lang: "en-US",
            tag: "start",
            icon: onlineImg,
            vibrate: [200, 100, 200],
            data: {
                url: globalScope.origin + "/web-app/Home"
            }
        });

        goToSiteNotification.addEventListener("click", async () => {
            try {
                goToSiteNotification.close();

                const clientList = await globalScope.clients.matchAll({ type: "window" }) as WindowClient[];

                const windowFocus = clientList.some(client => client.url === goToSiteNotification.data.url ? ( client.focus(), true) : false);

                if ( !windowFocus ) {
                    let windowClient = await globalScope.clients.openWindow(`${globalScope.location.origin}/home`);

                    if ( !windowClient ) return;

                    await windowClient.focus();
                }
            } catch (error) {
                let e = error as Error;
                console.log(e);
            }
        });
    });

    globalScope.addEventListener("offline", () => {
        if ( !("Notification" in self) ) return;

        if ( Notification.permission !== "granted" ) return;

        const offlineNotification = new Notification("web-app", {
            body: "It looks like you have lost your internet connection, please try to connect again.",
            lang: "en-US",
            tag: "start",
            icon: offlineImg,
            vibrate: [200, 100, 200]
        });

        offlineNotification.addEventListener("click", () => {
            offlineNotification.close();
        });
    });

    globalScope.addEventListener("install", (event) => {
        async function addCache() {
            let cache = await caches.open("v1");
            
            return cache.addAll(masOfSourceIcons);
        }

        event.waitUntil(addCache());
    });

    globalScope.addEventListener("fetch", (event) => {
        let method = event.request.method.toLowerCase();

        async function getResponse() {
            try {
                let googleMapURL = event.request.url.match(/maps?/), headers = event.request.headers;

                if ( googleMapURL !== null ) return await fetch(event.request, {
                    headers
                });

                let response = await caches.match(event.request);

                if ( typeof response !== "undefined" ) return response;

                let newResponse = await fetch(event.request, { headers });

                let cloneResponse = newResponse.clone();
                
                let cache = await caches.open("v1");
                cache.put(event.request, cloneResponse);

                return newResponse;
            } catch (error) {
                let e = error as Error;

                console.log(e);

                return new Response(
                    `
                    <!DOCTYPE html>
                    <html lang="en" translate="no">
                    <head>
                        <meta charset="UTF-8">
                        <title>Loading...</title>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="icon" type="image/png" href="/icon.png">
                        <link rel="manifest" href="/manifest.json">
                        <script src="/sw.js"></script>
                        <link rel="stylesheet" href="/index.css">
                        <script src="/redux_toolkit.bundle.js"></script>
                        <script src="/runtime~index.js"></script>
                        <script src="/486.js"></script>
                        <script src="/index.js"></script>
                    </head>
                    <body>
                        <div id="root" translate="no"></div>
                    </body>
                    </html>
                    `,
                    {
                        headers: {
                            "Content-Type": "text/html; charset=utf-8"
                        }
                    }
                );
            }
        }

        if ( (method === "get" || method === "head") ) event.respondWith(getResponse());
    });

    globalScope.addEventListener("activate", (event) => {
        async function clearCache() {
            let cacheKeepList = [ "v2" ];
            let keyList = await caches.keys();
            let keyListCleared = keyList.map(key => {
                if ( !cacheKeepList.includes(key) ) return caches.delete(key);
            });

            return Promise.all(keyListCleared);
        }

        event.waitUntil(clearCache());
    });
}

startWebWorker();