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

declare module globalThis {
    export var __NODE_ENV__: "development" | "production";
}