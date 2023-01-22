declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare module globalThis {
    export var __NODE_ENV__: "development" | "production";
}