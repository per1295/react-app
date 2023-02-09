const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", event => {
    event.waitUntil(caches.open("sw-store"));
});

sw.addEventListener("fetch", event => {
    event.respondWith(
        (async () => {
            const cache = await caches.open("sw-store");
            const { request } = event;
            const { method, headers, keepalive, url } = request;
            const { protocol } = new URL(url);
            let response: Response;

            try {
                const nowResponse = await fetch(request, { method, headers, keepalive });
                if ( !/^chrome\-extension/i.test(protocol) && nowResponse.status < 400 ) {
                    await cache.put(request, nowResponse.clone());
                }
                response = nowResponse;
            } catch (error) {
                let cachedResponse = await cache.match(request);

                if ( cachedResponse ) {
                    response = cachedResponse;
                } else {
                    const e = error as Error;
                    response = new Response(e.name, {
                        status: 500,
                        statusText: e.name
                    });
                }
            }

            return response;
        })()
    )
});

sw.addEventListener("online", () => {
    if ( Notification.permission === "granted" ) {
        sw.registration.showNotification("Your connection is back", {
            body: "You can use app as usual",
            icon: "online.png",
            vibrate: 200
        });
    }
});

sw.addEventListener("offline", () => {
    if ( Notification.permission === "granted" ) {
        sw.registration.showNotification("Your connection is lost", {
            body: "You cannot use app as usual",
            icon: "offline.png",
            vibrate: 200
        })
    }
});

sw.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        (async () => {
            const clients = await sw.clients.matchAll({ type: "window" });
            const hadWindowToFocus = clients.some(client => (client.focus(), true));
            if ( !hadWindowToFocus ) {
                const windowClient = await sw.clients.openWindow(`${sw.location.origin}/home`);
                if ( windowClient ) windowClient.focus();
            }
        })()
    )
});