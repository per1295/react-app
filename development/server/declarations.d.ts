declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare module "*.json"{
    const value: string;
    export default string;
}

declare module "*.scss";

declare module globalThis {
    interface DevelopmentMiddlewareApi {
        waitUntilValid: (fn: (arg: any) => any | void) => void;
    }

    export var __NODE_ENV__: "development" | "production" | "test";
    export var __DEVELOPMENT_MIDDLEWARE_API__: DevelopmentMiddlewareApi;
}