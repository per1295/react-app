export function getBaseURL() {
    if ( typeof location !== "undefined" ) {
        const { protocol, host } = location;
        return `${protocol}//${host}`
    }
    return "";
}