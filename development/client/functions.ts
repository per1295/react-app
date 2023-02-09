import { defer } from "react-router-dom";
import type { LoaderFunction, ActionFunction } from "react-router-dom";
import { setIsMobileTrue, setIsMobileFalse } from "./store/slices/isMobile";
import { setIsTabletTrue, setIsTabletFalse } from "./store/slices/isTablet";
import store from "./store/store";

export const createLoader = ({ pathname = "", isDefered = true, timeout = 20000 } = {}) => {
    const loader: LoaderFunction = async ({ request }) => {
        if ( !("Animation" in globalThis) ) {
            throw new Error("Your browser does not support the 'Animation'.\nUpdate him.");
        }

        let response: Promise<Response>;

        const { origin, pathname: urlPathname, search } = new URL(request.url);

        const normalizedPathname = (pathname || urlPathname).replace(/^\/(api\/)?/i, "").replace(/\/$/, "");

        const url = new URL(`api/${normalizedPathname}${search}`, origin);

        const controller = new AbortController();

        const requestInit: RequestInit = {
            method: "get",
            headers: request.headers,
            signal: controller.signal,
            keepalive: request.keepalive
        };

        try {
            const timeoutID = setTimeout(() => controller.abort(), timeout);

            response = fetch(url, requestInit);

            response.then(() => clearTimeout(timeoutID));

            return isDefered ? defer({ response }) : await response;
        } catch (error) {
            const e = error as Error;

            console.error(e);

            if ( /^aborterror/i.test(e.name) ) {
                throw new Error("The request aborted due to timeout");
            } else {
                throw e;
            }
        }
    }

    return loader;
}

export const createAction = ({ pathname = "", timeout = 20000 } = {}) => {
    const action: ActionFunction = async ({ request }) => {
        const body = await request.formData();
        const parsedBody = formDataToJSON(body);

        const { origin, pathname: urlPathname, search } = new URL(request.url);

        const normalizedPathname = (pathname || urlPathname).replace(/^\/api\//i, "").replace(/\/$/, "");

        const url = new URL(`api/${normalizedPathname}${search}`, origin);

        const controller = new AbortController();

        const requestInit: RequestInit = {
            method: request.method,
            body: parsedBody,
            headers: {
                ...request.headers,
                "Content-Type": "application/json; charset=utf-8"
            },
            signal: controller.signal,
            keepalive: request.keepalive
        };

        try {
            const timeoutID = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, requestInit);

            clearTimeout(timeoutID);

            return response;
        } catch (error) {
            const e = error as Error;

            console.error(e);

            if ( /^aborterror/i.test(e.name) ) {
                throw new Error("The request aborted due to timeout");
            } else {
                throw e;
            }
        }
    }

    return action;
}

export function formDataToJSON(formData: FormData): string {
    const result: { [key: string]: string } = {};

    for ( let [ key, value ] of formData.entries() ) {
        if ( value ) result[key] = value.toString();
    }

    return JSON.stringify(result);
}

type Device = "phone" | "tablet" | "computer";

export function isDevice(agent: Device): boolean {
    let result: boolean;
    const { userAgent } = navigator;

    const isPhone = /iphone|ipod|blackberry|iemobile|opera\smini/i.test(userAgent) || matchMedia("(max-width: 750px)").matches;
    const isTablet = /ipad/i.test(userAgent) || matchMedia("(min-width: 750px) and (max-width: 1024px)").matches;

    switch(agent) {
        case "phone":
            result = isPhone && !isTablet;
            break;
        case "tablet":
            result = isTablet && !isPhone;
            break;
        case "computer":
            result = !isTablet && !isPhone;
            break;
        default:
            throw new Error("Wrong type of device");
    }

    return result;
}

export function setDevice() {
    if ( isDevice("phone") ) store.dispatch( setIsMobileTrue() );
    else store.dispatch( setIsMobileFalse() );

    if ( isDevice("tablet") ) store.dispatch( setIsTabletTrue() );
    else store.dispatch( setIsTabletFalse() );
}