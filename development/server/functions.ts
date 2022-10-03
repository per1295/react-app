import { OptionsCookie } from "./constructors";

export function optionsCookie({ maxAge = 3.6e6, path = "/" } = {}): OptionsCookie {
    return new OptionsCookie({
        maxAge,
        path
    });
}